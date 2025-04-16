import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function MemberDetailScreen({ route }) {
  const { member } = route.params || {};
  const [details, setDetails] = useState(null);
  const [bindings, setBindings] = useState([]);

  async function getRoleAndOrg(roleId, orgId) {
    try {
      const [roleRes, orgRes] = await Promise.all([
        fetch(`https://api.lagtinget.ax/api/roles/${roleId}.json`),
        fetch(`https://api.lagtinget.ax/api/organizations/${orgId}.json`)
      ]);
      const role = await roleRes.json();
      const org = await orgRes.json();
      return {
        roleTitle: role.title,
        orgTitle: org.title
      };
    } catch (error) {
      console.error('Fel vid hämtning av roller/organisationer:', error);
      return { roleTitle: 'Okänd roll', orgTitle: 'Okänd organisation' };
    }
  }

  useEffect(() => {
    if (!member?.id) return;

    fetch(`https://api.lagtinget.ax/api/persons/${member.id}.json`)
      .then(res => res.json())
      .then(async (data) => {
        setDetails(data);

        const bindingsWithTitles = await Promise.all(
          data.bindings.map(async (binding) => {
            const titles = await getRoleAndOrg(binding.role, binding.organization);
            return {
              ...binding,
              ...titles
            };
          })
        );
        setBindings(bindingsWithTitles);
      })
      .catch(err => {
        console.error('Fel vid hämtning av medlem:', err);
      });
  }, [member]);

  if (!details) return <Text style={{ padding: 20 }}>Laddar information...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Avatar.Image size={100} source={{ uri: details.image?.url }} />
      <Text style={styles.name}>{details.complete_first_name} {details.last_name}</Text>
      <Text>Född: {details.birthday}</Text>
      <Text>E-post: {details.email}</Text>
      <Text>Yrke: {details.profession}</Text>

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Roller:</Text>
      {bindings.map((binding, index) => (
        <Text key={index}>
          {binding.roleTitle} i {binding.orgTitle} ({binding.period_start} – {binding.period_end})
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
});
