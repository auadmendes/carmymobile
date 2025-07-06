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

// db date "2025-08-17T14:00:00"

// minha date
// "2025-07-28T19:00:58.132Z"

export function DateComp({ value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const handleChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (!selectedDate) return;

    const current = new Date(value);

    if (mode === 'date') {
      current.setFullYear(selectedDate.getFullYear());
      current.setMonth(selectedDate.getMonth());
      current.setDate(selectedDate.getDate());
    } else if (mode === 'time') {
      current.setHours(selectedDate.getHours());
      current.setMinutes(selectedDate.getMinutes());
    }

    onChange(current);
  };

  const showMode = (pickerMode: 'date' | 'time') => {
    setMode(pickerMode);
    setShowPicker(true);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {/* <Text style={{ marginBottom: 5 }}>Data*</Text> */}

      <TouchableOpacity onPress={() => showMode('date')}>
        <TextInput
          editable={false}
          value={value.toLocaleDateString()}
          placeholder="Selecionar Data"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 6,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showMode('time')}>
        <TextInput
          editable={false}
          value={value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          placeholder="Selecionar Hora"
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
          mode={mode}
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
}
