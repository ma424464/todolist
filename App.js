import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, Platform } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskText: {
    marginLeft: 10,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Task 1', completed: false },
    { id: '2', description: 'Task 2', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const task = {
      id: Date.now().toString(),
      description: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <SafeAreaView style={styles.taskItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' },
        ]}
      >
        {item.description}
      </Text>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <SafeAreaView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </SafeAreaView>
    </SafeAreaView>
  );
}