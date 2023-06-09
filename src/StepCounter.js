import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default StepCounter = () => {

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

    const [stepCount, setStepCount] = useState(0);

    const subscribe = async () => {
        const available = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(available));

        if (available) {
            return Pedometer.watchStepCount(result => {
                setStepCount(result.steps);
            });
        }
    };

    useEffect(() => {
        const subscription = subscribe();
        return () => subscription && subscription.remove();
    }, []);

    return (
        <View style={null}>
            <Text style={{color:"white"}}>
                Is Pedometer available in this device:
                <Text style={{
                    color: isPedometerAvailable ? "green" : "red",
                    fontWeight: "bold"
                }}>
                    {" " + isPedometerAvailable}
                </Text>
            </Text>
            <Text style={{color:"white"}}>Step count: {stepCount}</Text>
        </View>
    );

}

const styles = StyleSheet.create({

})

