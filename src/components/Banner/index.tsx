import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    border-radius: 10px;
    background: #05445E;
    padding: 30px;
    height: 300px;
`

const Text = styled.text`
    font-size: 25px;
    font-weight: 500;
`

const TextGreen = styled.div`
    color: green;
    width: 100%;
    font-size: 25px;
    text-align: center;
    font-weight: 400;
`

const TextComp = styled.div`
    margin: auto;
`
export default function BannerInternal() {
  return (
    <Wrapper>
        <TextComp>
            <Text>There are no more markets to place your position on.</Text>
            <TextGreen>New markets would be added soon...</TextGreen>
        </TextComp>
    </Wrapper>
  )
}
