import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const MembersListScreen = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://api.lagtinget.ax/api/persons.json?state=1')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    const results = members.filter((member) =>
      (member.firstname?.toLowerCase() || '').includes(text.toLowerCase()) ||
      (member.lastname?.toLowerCase() || '').includes(text.toLowerCase()) ||
      (member.name?.toLowerCase() || '').includes(text.toLowerCase())
    );
    
    setFiltered(results);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detaljer', { member: item })}
    >
      <List.Item
        title={item.name}
        description={item.profession}
        left={() =>
          item.image?.url ? (
            <Avatar.Image size={48} source={{ uri: item.image.url }} />
          ) : (
            <Avatar.Icon size={48} icon="account" />
          )
        }
      />
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Sök ledamot..."
        value={search}
        onChangeText={handleSearch}
        style={{ padding: 10, backgroundColor: '#eee', margin: 10, borderRadius: 10 }}
      />
<FlatList
  data={search ? filtered : members} // visa filtered om det finns söktext
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
/>

    </View>
  );
};

export default MembersListScreen;