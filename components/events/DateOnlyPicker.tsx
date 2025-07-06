import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  value: Date;
  onChange: (date: Date) => void;
};

export function DateOnlyPicker({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      // Strip time (optional: depends if your logic needs time-zeroed)
      selectedDate.setHours(0, 0, 0, 0);
      onChange(selectedDate);
    }
  };

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          editable={false}
          value={value.toLocaleDateString()}
          placeholder="Selecionar Data"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 6,
          }}
        />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={new Date()} // optional: restrict to future events
        />
      )}
    </View>
  );
}
