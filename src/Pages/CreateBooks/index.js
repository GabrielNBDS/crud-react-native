import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import { Platform } from 'react-native';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import fire, { db } from '../../lib/firebase';

const CreateBooks = () => {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

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

    await db.collection('books').add({
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

  return (
    <KeyboardAvoidingView>
      <View style={{ marginTop: 16}}>
        <Input disabled={loading} value={name} onChangeText={setName} placeholder='Nome' />

        <Input disabled={loading} value={author} onChangeText={setAuthor} placeholder='Autor' />

        <Input disabled={loading} value={pages} onChangeText={onTextChanged} keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"} placeholder='N° de páginas' />
      </View>

      {error !== '' && <Text style={{ color: 'red', marginBottom: 16, marginHorizontal: 8}}>{error}</Text>}

      <View style={{ marginHorizontal: 8}}>
        <Button loading={loading} onPress={HandleSubmit} title="Adicionar" />
      </View>
    </KeyboardAvoidingView>
  );

}

export default CreateBooks;