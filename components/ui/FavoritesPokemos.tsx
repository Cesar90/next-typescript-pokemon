import React, {FC} from 'react'
import { Grid, Card} from '@nextui-org/react'
import FavoriteCardPokemon from '@components/ui/FavoriteCardPokemon'

interface IProps{
  pokemons: number[]
}

const FavoritesPokemos:FC<IProps> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
        {
          pokemons.map( id => (
            <FavoriteCardPokemon key={id} pokemonId={ id } />
          ))
        }
    </Grid.Container>
  )
}

export default FavoritesPokemos
