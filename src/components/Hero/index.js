import {
	Circle,
	Header,
	HeroContent,
	HeroSection,
	Navigation,
	ThumbList,
} from './styles'

const Hero = ({}) => {
	return (
		<HeroSection>
			<Header className="container">
				<a href="#">
					<img src="/images/logo.png" className="logo" alt="logo" />
				</a>
				<Navigation>
					<li className="d-none">
						<a href="#">Whats new</a>
					</li>
					<li>
						<a href="#">CONTÁCTANOS</a>
					</li>
				</Navigation>
			</Header>
			<Circle />
			<div className="container">
				{/**dasdsadasdsa */}
				<HeroContent>
					<div className="textBox">
						<h2>
							Its not just Coffe <br /> Its <span>Starbucks</span>
						</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
							reprehenderit eum nulla tenetur.
						</p>
						<a href="#">Learn more</a>
					</div>
					<div className="imgBox">
						<img className="starbucks" src="/images/img1.png" alt="img 1" />
					</div>
					<ThumbList>
						<li>
							<img
								src="/images/img1.png"
								data-src="/images/img1.png"
								alt="thumb 1"
							/>
						</li>
						<li>
							<img
								src="/images/img2.png"
								data-src="/images/img2.png"
								alt="thumb 2"
							/>
						</li>
						<li>
							<img
								src="/images/img3.png"
								data-src="/images/img3.png"
								alt="thumb 3"
							/>
						</li>
					</ThumbList>
				</HeroContent>
			</div>
		</HeroSection>
	)
}

export default Hero
