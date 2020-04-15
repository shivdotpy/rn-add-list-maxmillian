import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
	const [ courseGoals, setCourseGoals ] = useState([]);
	const [ isAddMode, setIsAddMode ] = useState(false);

	const addGoalHandler = (goalTitle) => {
		setCourseGoals([ ...courseGoals, { key: Math.random().toString(), value: goalTitle } ]);
		setIsAddMode(false);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			return currentGoals.filter((goal) => goal.key !== goalId);
		});
	};

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	}

	return (
		<View style={styles.screen}>
			<Button title="Add new goal" onPress={() => setIsAddMode(true)} />
			<GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} cancelGoalAdditionHandler={cancelGoalAdditionHandler} />
			<FlatList
				data={courseGoals}
				renderItem={(itemData) => (
					<GoalItem id={itemData.item.key} value={itemData.item.value} onDelete={removeGoalHandler} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { padding: 50 }
});
