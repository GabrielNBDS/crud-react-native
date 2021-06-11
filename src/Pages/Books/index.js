import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { FlatList } from 'react-native-gesture-handler';
import { useBooks } from '../../hooks/books';
import { db } from '../../lib/firebase';

const BookCard = ({name, author}) => (
  <ListItem.Content>
    <ListItem.Title>{name}</ListItem.Title>
    <ListItem.Subtitle>{author}</ListItem.Subtitle>
  </ListItem.Content>
)

const Books = () => {
  const { navigate } = useNavigation();
  const { books } = useBooks()

  return (
    <>
      <TouchableOpacity onPress={() => navigate('Create')} style={{ position: 'absolute', bottom: 16, right: 16 ,width: 48, borderRadius: 24, height: 48, backgroundColor: '#2188DD', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 }}>
        <Icon type="feather" name="plus" color="#fff" />
      </TouchableOpacity>


      <FlatList
        showsHorizontalScrollIndicator={false}
        numColumns={1}
        data={books}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem onPress={() => navigate('Details', { id: item.id, name: item.name, author: item.author, pages: item.pages})} ListItem bottomDivider>
            <BookCard name={item.name} author={item.author} />
          </ListItem>
        )}
      />
    </>
  )
}

export default Books;