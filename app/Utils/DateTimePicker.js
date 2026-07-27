import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from './theme';

// mode: 'date' | 'time' | 'datetime'
export default function DateTimeInput({
  value,
  onChange,
  mode = 'date',
  placeholder = 'Select date',
  label,
}) {
  const [show, setShow] = useState(false);
  // Android only: tracks which step of the datetime flow we're in
  const [androidStep, setAndroidStep] = useState('date'); // 'date' | 'time'

  const handleChange = (event, selectedValue) => {
    if (Platform.OS === 'android') {
      // Android: picker is a modal dialog, always closes itself after
      // Cancel button → event.type === 'dismissed', selectedValue is undefined
      // OK button → event.type === 'set', selectedValue is provided
      if (event.type !== 'set' || !selectedValue) {
        setShow(false);
        setAndroidStep('date');
        return;
      }

      if (mode === 'datetime' && androidStep === 'date') {
        // Date picked — merge into existing value, then immediately open the time picker
        const merged = new Date(value || new Date());
        merged.setFullYear(selectedValue.getFullYear(), selectedValue.getMonth(), selectedValue.getDate());
        onChange(merged);
        setAndroidStep('time');
        return; // keep `show` true, picker re-renders in 'time' mode below
      }

      if (mode === 'datetime' && androidStep === 'time') {
        // Time picked — merge hours/minutes into existing value, then close
        const merged = new Date(value || new Date());
        merged.setHours(selectedValue.getHours(), selectedValue.getMinutes());
        onChange(merged);
        setShow(false);
        setAndroidStep('date'); // reset for next time picker is opened
        return;
      }

      // Single mode ('date' or 'time') — one step only
      onChange(selectedValue);
      setShow(false);
      return;
    }

    // iOS: picker is inline (spinner/calendar), stays open, fires on every scroll/tap
    // iOS supports mode="datetime" natively, so no chaining needed here
    if (selectedValue) {
      onChange(selectedValue);
    }
  };

  // iOS only: call this from a "Done" button to close the inline picker
  const handleIosDone = () => setShow(false);

  const formatValue = () => {
    if (!value) return '';
    if (mode === 'date') return value.toLocaleDateString();
    if (mode === 'time') return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return value.toLocaleString();
  };

  return (
    <View style={styles.container}>
      {/* {label && <Text style={styles.label}>{label}</Text>} */}

      <TouchableOpacity style={styles.input} onPress={() => setShow(true)} activeOpacity={0.7}>
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value ? formatValue() : placeholder}
        </Text>
      </TouchableOpacity>

      {show && (
        <View>
          <DateTimePicker
            value={value || new Date()}
            mode={
              Platform.OS === 'android' && mode === 'datetime'
                ? androidStep // switches between 'date' then 'time'
                : mode        // iOS handles 'datetime' natively in one picker
            }
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={handleIosDone} style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#5c5987",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
  },
  valueText: {
    fontSize: 16,
    color: COLORS.text,
  },
  placeholderText: {
    fontSize: 16,
    color: COLORS.text,
  },
  doneButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  doneText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});

/*
USAGE

const [birthDate, setBirthDate] = useState(null);

<DateTimeInput
  label="Date of Birth"
  value={birthDate}
  onChange={setBirthDate}
  mode="date"
  placeholder="Select date of birth"
/>

const [meetingTime, setMeetingTime] = useState(null);

<DateTimeInput
  label="Meeting Time"
  value={meetingTime}
  onChange={setMeetingTime}
  mode="time"
  placeholder="Select time"
/>

const [appointment, setAppointment] = useState(null);

<DateTimeInput
  label="Appointment"
  value={appointment}
  onChange={setAppointment}
  mode="datetime"
  placeholder="Select date and time"
/>
// Android: opens date picker, then automatically opens time picker, merges both into one Date
// iOS: single inline picker shows both date and time together
*/