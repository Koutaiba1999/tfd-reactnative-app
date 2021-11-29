import React, { useEffect, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Alert } from "react-native";
import { Card, Title, Text, FAB } from "react-native-paper";

import { getDataStock } from "../../services/stocks";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

import { setistrans, setStockData, setupdate } from "../../store/stocks";
import _ from "lodash";
import moment from "moment";

moment.locale("fr");

import { ScrollView } from "react-native-gesture-handler";
import StockTransfert from "./components/Modals/StockTransfert";
import { logout } from "../../store/auth";
import { AuthContext } from "../../helpers/context";

// écran pour afficher le stocke et faire des transferts
const StockScreenIndex = (props) => {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authState);
  const stockState = useSelector((state) => state.stockState);
  const [state, setState] = React.useState({ open: false });
  const [HeadTable, setHeadTable] = useState([
    "Ville",
    "A plus|moins",
    "B plus|moins",
    "AB plus|moins",
    "O plus|moins",
    "Total",
  ]);
  const [DataTable, setDataTable] = useState([
    ["1", "2", "3", "4", "5", "30"],
    ["a", "b", "c", "d", "e", "20"],
    ["1", "2", "3", "4", "5", "10"],
    ["a", "b", "c", "d", "e", "15"],
    ["1", "2", "3", "4", "5", "17"],
  ]);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { signOut } = useContext(AuthContext);
  // on récupère le stock par magasin lorsque l'écran stock s'affiche
  useEffect(() => {
    console.log("get data from useeffect");
    if (stockState.update) {
      dispatch(setupdate(false));
    }
    const member = authState.member;
    const userToken = authState.userToken;

    setTimeout(
      () => {
        getDataStock({}, userToken)
          .then(async (response) => {
            //console.log(response.data);

            dispatch(setStockData(response.data));
            let t = [];

            for (let i = 0; i < response.data.length; i++) {
              let t2 = [];
              //console.log("item ", i, " est ", response.data[i].ville);
              t2.push(response.data[i].ville);
              for (let j = 0; j < response.data[i].bloodstock.length; j++) {
                t2.push(
                  response.data[i].bloodstock[j].souscategorieplus +
                    " | " +
                    response.data[i].bloodstock[j].souscategoriemoins
                );
              }
              t2.push(totalStock(response.data[i]));
              t.push(t2);
            }
            setDataTable(t);
          })
          .catch((error) => {
            // if (error.response.data.message == "Unauthenticated.") {
            Alert.alert(
              "votre token est expiré.Cliquer OK pour se reconnecter"
            );
            console.log(error);
            signOut();
            //}
          });
      },
      500,
      member,
      userToken
    );
    console.log(authState.member);
  }, [stockState.update]);
  //cette fonction retourne le total des stocks
  const totalStock = (item) => {
    var i;
    var sum = 0;
    for (i = 0; i < item.bloodstock.length; i++) {
      sum +=
        item.bloodstock[i].souscategorieplus +
        item.bloodstock[i].souscategoriemoins;
    }
    return sum;
  };
  // affiche le button pour le formulaire du transfert du stock
  const transformbutton = () => {
    return (
      <FAB.Group
        style={{ elevation: 5, position: "absolute" }}
        open={open}
        color={"white"}
        fabStyle={{ backgroundColor: "#5f3056", elevation: 0 }}
        icon={"plus"}
        actions={[
          {
            icon: "plus",
            // label: "Par véhicule",
            onPress: () => {
              dispatch(setistrans(true));
            },
          },
        ]}
        onStateChange={onStateChange}
      />
    );
  };

  // si le stock est vide alors pas du stock si non off afiche les stocks par magasin
  if (stockState.stocks) {
    if (stockState.stocks.length === 0) {
      return (
        <View style={styles.centerBox}>
          <Text>Pas de Stock</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ffa1d2" }}>
            <Row
              data={HeadTable}
              style={styles.HeadStyle}
              textStyle={styles.TableText}
            />
            <Rows data={DataTable} textStyle={styles.TableText} />
          </Table>

          <ScrollView style={{ flex: 1, padding: 15 }}>
            {stockState.stocks.map((item, index) => (
              <Card
                key={index}
                style={{
                  elevation: 0,
                  borderWidth: 0.4,
                  borderColor: "#ccc",
                  marginBottom: 15,
                }}
              >
                <Card.Content>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Title>{"Centre " + item.centre}</Title>
                    {/*  */}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Title>{"Ville " + item.ville}</Title>
                  </View>
                  <View>
                    {item.bloodstock
                      ? item.bloodstock.map((itm, i) => (
                          <View key={i}>
                            <Text>
                              Stock en {itm.categorie} : {"+ =>"}
                              {itm.souscategorieplus} {"/ - => "}
                              {itm.souscategoriemoins}
                            </Text>
                          </View>
                        ))
                      : null}
                  </View>
                  <Text style={{ fontWeight: "bold" }}>
                    {"Stock total du sang: " + totalStock(item).toString()}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          {transformbutton()}

          <StockTransfert></StockTransfert>
        </View>
      );
    }
  } else return null;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  HeadStyle: {
    height: 60,
    alignContent: "center",
    backgroundColor: "#ffe0f0",
  },
  TableText: {
    margin: 5,
  },
  roleBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 3,
  },
  centerBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default StockScreenIndex;
