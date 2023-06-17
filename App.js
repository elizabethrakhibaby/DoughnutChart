import Slider from '@react-native-community/slider';
import React, {useState} from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

const App = () => {
  const[earnings, setEarnings] = useState(0);
  const[expenditure, setExpenditure] = useState(0);
  const handleEarningsChange = (value) => {
    setEarnings(parseFloat(value.toFixed(0)));
  }
  const handleExpenditureChange = (value) => {
    setExpenditure(parseFloat(value.toFixed(0)));
  }




  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;
  const total = earnings + expenditure;
  const net = earnings - expenditure;

  const earningsPercentage = (earnings / total) * 100;
  const expenditurePercentage = (expenditure / total) * 100;

  const earningsStrokeDashoffset =
    circleCircumference - (circleCircumference * earningsPercentage) / 100;
  const expenditureStrokeDashoffset =
    circleCircumference - (circleCircumference * expenditurePercentage) / 100;

  const earningsAngle = (earnings / total) * 360;
  const expenditureAngle = (expenditure / total) * 360;

  return (
    <View style={styles.container}>
      <Text style = {{bottom:150}}>
        More Earnings</Text>

<Slider
  style={{width: 200, height: 40, bottom: 140}}
  minimumValue={0}
  maximumValue={100}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
  onValueChange={handleEarningsChange}
 
/>

<Text style = {{bottom:100}}>
        More Expenditure</Text>

<Slider
  style={{width: 200, height: 40, bottom: 90}}
  minimumValue={0}
  maximumValue={100}
  minimumTrackTintColor="#FFFFFF"
  maximumTrackTintColor="#000000"
  onValueChange={handleExpenditureChange}
/>
      <View style={styles.graphWrapper}>
        <Svg height="270" width="270" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            { total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#83918b"
                fill="transparent"
                strokeWidth="40"
              />
             ) : (
               <> 
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#0057B7"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={earningsStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />

                 
                 <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#ffd700"
                  fill="transparent"
                  strokeWidth="40"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={expenditureStrokeDashoffset}
                  rotation={earningsAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                 />
               </>
             )
            }
          </G>
        </Svg>
        <Text style={styles.label}>$ {net}</Text>
      </View>
    </View>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8ebd5"
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 24,
  },
  slider1: {
    bottom: 30
  }
});