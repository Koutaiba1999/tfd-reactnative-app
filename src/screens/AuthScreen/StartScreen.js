import React from "react";

import Background from "../../components/Background";
import Logo from "../../components/Logo";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Paragraph from "../../components/Paragraph";
import {
  
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
const { height } = Dimensions.get("window");
const topRange = height - 50;
const StartScreen = ({ navigation }) => {
  const draggableRange = { top: topRange, bottom: topRange / 1.618 };
  const _draggedValue = new Animated.Value(0);
  return (
    <Background>
      <Logo />
      <SlidingUpPanel
        draggableRange={draggableRange}
        animatedValue={_draggedValue}
        snappingPoints={[360]}
        height={topRange}
        friction={0.5}
        backdropOpacity={0}
      >
        <View style={styles.panel}>
          <Header>Gestion Stock de poches de sang </Header>
          <Paragraph>
            Choisir bloodstock permet de vous faciliter la gestion de votre stock de poches de sang.
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("LoginScreen")}
          >
            S'identifier
          </Button>
          <Button
            mode="outlined"
            onPress={() => (
              navigation.navigate("RegisterScreen")
            )}
          >
            S'inscrire
          </Button>
        </View>
      </SlidingUpPanel>
    </Background>
  );
};

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    position: "relative",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 6,
    padding: 20,
  },
});

export default StartScreen;
