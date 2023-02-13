import { View, Text, TouchableOpacity } from "react-native";
import Logo from "../assets/logo.svg"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

export function Header() {
    const { navigate } = useNavigation();

    const formattedDate = dayjs().hour(23).minute(59).second(59)

    return (
        <View className="w-full flex-row items-center justify-between">
            <Logo />

            <View className="flex-row gap-3">
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row justify-center h-11 w-11 border border-violet-500 rounded-lg items-center"
                    onPress={() => navigate('habit', { date: formattedDate.toISOString() })}
                >
                    <Feather name="check-square" color={colors.white} size={20} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
                    onPress={() => navigate('new')}
                >
                    <Feather name="plus" color={colors.violet[500]} size={20} />

                    <Text className="text-white ml-3 font-semibold text-base">
                        Novo
                    </Text>
                </TouchableOpacity>
            </View>                    
        </View>
    )
}