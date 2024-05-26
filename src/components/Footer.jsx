import 'flowbite'; // Asegúrate de que esta importación sea correcta y de que el archivo flowbite.min.js esté en el lugar correcto
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import logoImage from '../images/logo.jpg';

export default function FooterComponent() {
    return (
      <Footer>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className='p-5'>
              <FooterBrand
                href="/"
                src={logoImage}
                alt="AjoySal Logo"
                name='AjoySal'
              /><br/>
              <p className='text-white'>Descubre y comparte recetas en AjoySal: tu portal de cocina favorito.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="Sobre nosotros" />
                <FooterLinkGroup col>
                  <FooterLink href="/recipeadmin">Recetas</FooterLink>
                  <FooterLink href="/aboutus">Conócenos</FooterLink>
                  <FooterLink href="/contact">Contacto</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Síguenos" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Politicas de privacidad</FooterLink>
                  <FooterLink href="#">Términos &amp; Condiciones</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between pl-5 pb-5 pr-5">
            <FooterCopyright href="#" by="Ajoysal" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    );
  }