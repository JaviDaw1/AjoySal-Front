// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
    Footer,
    FooterBrand,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from "flowbite-react";
import logo from '../images/logo.jpg'

export default function Component() {
    return (
        <Footer container className="w-full rounded-none bg-gray-200">
            <div className='w-full'>
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <FooterBrand
                            href="/"
                            src={logo}
                            className='w-1'
                            name="AjoySal"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title="Navega" className='text-base' />
                            <FooterLinkGroup col>
                                <FooterLink href="/recipeclient" className='text-base'>Recetas</FooterLink>
                                <FooterLink href="/postrecipe" className='text-base'>Publicar Receta</FooterLink>
                                <FooterLink href="/contact" className='text-base'>Contacto o dudas</FooterLink>
                                <FooterLink href="/aboutus" className='text-base'>Sobre nosotros</FooterLink>
                                <FooterLink href="/login" className='text-base'>Iniciar Sesón</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Siguenos" className='text-base' />
                            <FooterLinkGroup col>
                                <FooterLink href="#" className='text-base'>Twitter</FooterLink>
                                <FooterLink href="#" className='text-base'>Instagram</FooterLink>
                                <FooterLink href="#" className='text-base'>Facebook</FooterLink>
                                <FooterLink href="#" className='text-base'>Github</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Políticas" className='text-base' />
                            <FooterLinkGroup col>
                                <FooterLink href="#" className='text-base'>Política de privacidad</FooterLink>
                                <FooterLink href="#" className='text-base'>Términos &amp; Condiciones</FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <div>
                    <hr className='my-6'></hr>
                    <Footer.Copyright href="/" className="text-lg" by="Ajo y Sal" year={2024} />
                </div>
            </div >
        </Footer >
    );
}
