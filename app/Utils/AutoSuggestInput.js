import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// Suggestion shape: { id: string, label: string }

export default function AutoSuggestInput({
  data,               // optional static array of suggestions
  fetchSuggestions,   // optional async function(query) => array of suggestions
  onSelect,
  placeholder = 'Search...',
  debounceMs = 300,
  minChars = 1,
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const debounceTimer = useRef(null);
  const requestId = useRef(0);

  const filterLocal = useCallback(
    (text) => {
      if (!data) return [];
      const lower = text.toLowerCase();
      return data.filter((item) => item.label.toLowerCase().includes(lower));
    },
    [data]
  );

  useEffect(() => {
    // Clear any pending debounce on unmount
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const handleChangeText = (text) => {
    setQuery(text);
    setShowList(true);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (text.length < minChars) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      if (fetchSuggestions) {
        // Dynamic mode: hit an API, guard against out-of-order responses
        const currentRequest = ++requestId.current;
        setLoading(true);
        try {
          const results = await fetchSuggestions(text);
          if (currentRequest === requestId.current) {
            setSuggestions(results);
          }
        } catch (err) {
          if (currentRequest === requestId.current) {
            setSuggestions([]);
          }
        } finally {
          if (currentRequest === requestId.current) {
            setLoading(false);
          }
        }
      } else {
        // Static mode: filter in-memory list
        setSuggestions(filterLocal(text));
      }
    }, debounceMs);
  };

  const handleSelect = (item) => {
    setQuery(item.label);
    setShowList(false);
    setSuggestions([]);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        onFocus={() => setShowList(true)}
        autoCorrect={false}
      />

      {loading && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" />
        </View>
      )}

      {showList && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loadingRow: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  dropdown: {
    marginTop: 4,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 15,
  },
});