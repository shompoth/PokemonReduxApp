import "@testing-library/jest-native/extend-expect";

jest.mock("react-native", () => ({
  Platform: { select: jest.fn() },
  Image: "Image",
  ActivityIndicator: "ActivityIndicator",
  NativeModules: {
    SettingsManager: {
      settings: {
        AppleLocale: "en_US",
        AppleLanguages: ["en"],
      },
    },
  },
  Animated: {
    timing: () => ({
      start: jest.fn(),
    }),
    Value: jest.fn(() => ({
      interpolate: jest.fn(),
      setValue: jest.fn(),
    })),
  },
  View: "View",
  Text: "Text",
  TouchableOpacity: "TouchableOpacity",
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
}));

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => ({
  Link: ({ children, href, asChild }) => children,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

jest.mock("@expo/vector-icons/FontAwesome", () => ({
  default: function MockFontAwesome({ testID, name }) {
    return {
      type: "View",
      props: {
        testID,
        children: {
          type: "Text",
          props: {
            children: name,
          },
        },
      },
    };
  },
}));

jest.mock("./src/store/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));
