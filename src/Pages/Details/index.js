import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { Platform } from 'react-native';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import fire, { db } from '../../lib/firebase';

const Details = () => {
  const route = useRoute();

  const { id, name: paramsName, author: paramsAuthor, pages: paramsPages } = route.params;

  const [name, setName] = useState(paramsName);
  const [author, setAuthor] = useState(paramsAuthor);
  const [pages, setPages] = useState(paramsPages);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  
  async function HandleSubmit() {
    setError('');
    setLoading(true);

    if(name === '') {
      setError('Preencha o campo "Nome".')
      setLoading(false);
      return;
    }
    if(author === '') {
      setError('Preencha o campo "Autor".')
      setLoading(false);
      return;
    }
    if(pages === '') {
      setError('Preencha o campo "N° de páginas".')
      setLoading(false);
      return;
    }
    if(Number(pages) < 1) {
      setError('O campo "N° de páginas" deve ter um valor maior que 0.')
      setLoading(false);
      return;
    }

    await db.collection('books').doc(id).set({
      name,
      author,
      pages,
      createdAt: fire.firestore.FieldValue.serverTimestamp(),
    })

    navigate('Books')
  }

  function onTextChanged(value) {
    setPages(value.replace(/[^0-9]/g, ''));
  }

  async function deleteBook() {
    setError('');
    setLoading(true);

    await db.collection('books').doc(id).delete();

    navigate('Books')
  }

  return (
    <KeyboardAvoidingView>
      <View style={{ marginTop: 16}}>
        <Input disabled={loading} value={name} onChangeText={setName} placeholder='Nome' />

        <Input disabled={loading} value={author} onChangeText={setAuthor} placeholder='Autor' />

        <Input disabled={loading} value={pages} onChangeText={onTextChanged} keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"} placeholder='N° de páginas' />
      </View>

      {error !== '' && <Text style={{ color: 'red', marginBottom: 16, marginHorizontal: 8}}>{error}</Text>}

      <View style={{ marginHorizontal: 8}}>
        <Button
          icon={
            <View style={{marginLeft: 4}}>
              <Icon
                type="feather"
                name="edit"
                size={18}
                color="white"
              />
            </View>
          }
          iconRight
          loading={loading}
          onPress={HandleSubmit}
          title="Editar"
        />
        <View style={{marginBottom: 8}}></View>
        <Button
          icon={
            <View style={{marginLeft: 4}}>
              <Icon
                type="feather"
                name="trash"
                size={18}
                color="white"
              />
            </View>
          }
          buttonStyle={{
            backgroundColor: "red"
          }}
          loading={loading}
          iconRight
          onPress={deleteBook}
          title="Excluir"
        />
      </View>
    </KeyboardAvoidingView>
  );

}

export default Details;