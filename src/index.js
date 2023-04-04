
/*** 
 *  Selecionando os elementos do DOM
 ***/
const navbarElement = document.getElementById("nav");
const linksElement = document.querySelector(".links");
const topLinkElement = document.querySelector(".top-link");
const navToggleElement = document.querySelector(".nav-toggle");
const currentYearElement = document.getElementById("date");
const scrollLinksElements = document.querySelectorAll(".scroll-link");
const linksContainerElement = document.querySelector(".links-container");

/** 
 * Calculando a altura da navbar 
 **/
const NAVBAR_HEIGHT = navbarElement.getBoundingClientRect().height;


/**
Configurando o ano atual no rodapé
**/
const date = new Date().getFullYear();
currentYearElement.innerHTML = date;


/***
Função que abre/fecha o container de links
***/
const toggleLinksContainer = () => {
  const containerHeight = linksContainerElement.getBoundingClientRect().height;
  const linksHeight = linksElement.getBoundingClientRect().height;
  linksContainerElement.style.height = containerHeight === 0 ? `${linksHeight}px` : 0;
};


/***
Função que adiciona/ remove classe para navbar fixa e para exibir botão de scroll to top
***/
const toggleFixedNavbarAndTopLink = () => {
  const scrollHeight = window.pageYOffset;
  navbarElement.classList.toggle("fixed-nav", scrollHeight > NAVBAR_HEIGHT);
  topLinkElement.classList.toggle("show-link", scrollHeight > 500);
};


/** 
 * Adicionando event listeners
 **/
navToggleElement.addEventListener("click", toggleLinksContainer);
window.addEventListener("scroll", toggleFixedNavbarAndTopLink);


/***
Função que manipula o scroll para a posição do elemento do menu selecionado
***/
const handleLinkClick = (event) => {
  event.preventDefault();
  const targetElement = document.getElementById(event.currentTarget.getAttribute("href").slice(1));

  const containerHeight = linksContainerElement.getBoundingClientRect().height;
  const fixedNav = navbarElement.classList.contains("fixed-nav");
  const targetPosition = targetElement.offsetTop - NAVBAR_HEIGHT;
  const extraHeight = fixedNav ? NAVBAR_HEIGHT : 2 * NAVBAR_HEIGHT + containerHeight;
  windowScrollToHandleLink(targetPosition, extraHeight);
};


/** 
 * Adicionando listener para cada link do menu
 **/
const addLinkClickHandler = (link) => link.addEventListener("click", handleLinkClick);
scrollLinksElements.forEach(addLinkClickHandler);


/***
Função que scrola para o link selecionado
***/
const windowScrollToHandleLink = (position, height) => {
  window.scrollTo({
    left: 0,
    top: position + height,
  });
  linksContainerElement.style.height = 0;
}