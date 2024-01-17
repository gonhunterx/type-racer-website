import Image from 'next/image'
import Wrapper from './components/Wrapper'
import GameBox from './components/GameBox'
import FlexWrapper from './components/FlexWrapper'

export default function Home() {
  return (
    
    <Wrapper>
      <h1 className='text-3xl font-bold'>DartTyper</h1>
    <FlexWrapper>
      <GameBox />
    </FlexWrapper>
    </Wrapper>
    
  )
}
