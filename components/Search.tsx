import { View, TextInput } from "react-native";
import { CustomIcon } from "./CustomIcon";
import { Ionicons } from '@expo/vector-icons';
export function Search() {
    return (
        <View className="flex flex-row w-full items-center p-2 bg-white">
            <TextInput
                placeholder="Search"
                className="flex-1 border border-gray-300 rounded-lg p-2"
                style={{ margin: 10, padding: 10, fontSize: 16 }}
            />
            <CustomIcon icon={Ionicons} name="filter" color="blue" />
        </View>
    )
}