import React, {useState, useEffect} from 'react'
import { Layout } from '@components/layouts'
import { NoFavorites } from '@components/ui'
import localFavorites from '@utils/localFavorites'
import FavoritesPokemos from '@components/ui/FavoritesPokemos'

const FavotitesPage = () => {
  const [favoritesPokemos, setFavoritesPokemos] = useState<number[]>([])

  useEffect(() => {
    setFavoritesPokemos( localFavorites.pokemos() )
  }, [])

  return (
    <Layout title="Favorites - Pokemon">

      {
        favoritesPokemos.length === 0
        ? ( <NoFavorites /> ) : (
          <FavoritesPokemos pokemons={favoritesPokemos} />
        )
      }
    </Layout>
  )
}

export default FavotitesPage
