import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';

import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { Background } from '../../components/Background';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

export function Games() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as GameParams

  function handleGoBack() {
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://ca8c-37-120-207-54.ngrok.io/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data)
      )
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}