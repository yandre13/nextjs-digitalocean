import styled from 'styled-components'

export const HeroSection = styled.section`
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding: 10px;
`

export const Header = styled.header`
    width: 100%;
    height: var(--header-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .logo{
        position: relative;
        max-width: 54px;
    }
`

export const HeroContent = styled.div`
    position: relative;
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & .textBox{
        position: relative;
        max-width: 600px;
        width: 100%;
        & h2{
            color: var(--text-color);
            font-size: 2rem;
            line-height: 1.4em;
            font-weight: bold;
            @media screen and (min-width: 768px){
                font-size: 2.6rem;
            }
            @media screen and (min-width: 990px){
                font-size: 3.4rem;
            }
            @media screen and (min-width: 1200px){
                font-size: 4rem;
            }
        }
        & h2 span{
            color: #017143;
            line-height: 1.2em;
            font-weight: 900;
        }
        & p{
            color: var(--text-color);
        }
        & a{
            display: inline-block;
            padding: 8px 22px;
            background: #017143;
            color: #fff;
            border-radius: 18px;
            font-weight: normal;
            letter-spacing: 1px;
            text-decoration: none;
        }
    }

    & .imgBox{
        max-width: 600px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;

        & img{
            max-width: 240px;
            margin: auto;
            @media screen and (min-width: 768px){
                max-width: 280px;
                margin: 0;
            }
            @media screen and (min-width: 1200px){
                max-width: 360px;
            }
        }
    }

    @media screen and (min-width: 768px){
        flex-direction: row;
    }
`



export const Navigation = styled.ul`
    position: relative;
    display: none;
    & li{
        list-style: none;
    }
    & li a{
    display: inline-block;
    color: var(--text-color);
    font-weight: 300;
    margin-left: 40px;
    text-decoration: none;
}
    @media screen and (min-width: 768px){
        display: flex;
    }
`

export const Circle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #017143;
    clip-path: circle(74% at right 111%);
    @media screen and (min-width: 768px){
        clip-path: circle(68% at right 128%);
    }
`

export const ThumbList = styled.ul`
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: none;
    & li{
        list-style: none;
        display: inline-block;
        margin: 0 20px;
        cursor: pointer;
        transition: 0.5s;
        :hover{
            transform: translateY(-15px);
        }
        & img{
            max-width: 60px;
        }
    }
    @media screen and (min-width: 600px){
        display: flex;
    }

`