import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator color={"#EF4444"} />
    </View>
  );
}
