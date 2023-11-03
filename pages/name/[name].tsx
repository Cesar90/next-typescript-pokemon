import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Grid, Card, Text, Button, Container, Image} from '@nextui-org/react'
import confetti from 'canvas-confetti'
import { Layout } from '@components/layouts'
import { PokemonListResponse, SmallPokemon, Pokemon } from 'interfaces'
import { pokeApi } from 'api'
import { getPokemonInfo, localFavorites } from '@utils/index'

interface Props{
  pokemon: Pokemon
}


export const PokemonName: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorite, setIsInFavorite] = useState( localFavorites.existPokemonInFavorites(pokemon.id) )

  const onToggeFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id)
    setIsInFavorite(!isInFavorite)

    if(!isInFavorite){
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin:{
          x: 1,
          y: 0
        }
      })
    }
  }

  useEffect(() => {
    
    return () => {
    }
  }, [])
  
  return (
    <Layout title={ pokemon.name }>
      <Grid.Container css={{ marginTop: '5px', }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png'} 
                alt={pokemon.name}
                width="100%"
                height={ 200 }
                >
                  
              </Card.Image>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
            <Card>
              <Card.Header css={{ display:'flex', justifyContent: 'space-between' }}>
                <Text h1 transform='capitalize'>
                  {pokemon.name}
                </Text>

                <Button
                  color="gradient"
                  ghost={ !isInFavorite }
                  onPress={onToggeFavorite}
                >
                  {isInFavorite ? 'In Favorites' : 'Save in favorites'}
                  
                </Button>
              </Card.Header>
              <Card.Body>
                <Text size={30}>Sprites:</Text>
                <Container direction="row" display="flex" gap={ 0 }>
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_default}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <Image
                    src={pokemon.sprites.back_shiny}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async(ctx) =>{

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons151 = data.results.map( pokemon => {
    return {
      params: { name: pokemon.name }
    }
  })
  return {
    paths: pokemons151,
    // fallback: false
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async({params}) => {
  const { name } = params as { name: string }
  const pokemon = await getPokemonInfo(name);
  if( !pokemon ){
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props:{
      pokemon
    }
  }
}

export default PokemonName
