'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { 
  Globe, 
  Smartphone, 
  Database, 
  Terminal, 
  Palette, 
  Video, 
  Layers,
  Code2,
  Server,
  GitBranch,
  Film,
  Layout
} from 'lucide-react';

// Technology icons as simple SVG components
const TechIcons: Record<string, () => JSX.Element> = {
  'HTML': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  'CSS': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  'JavaScript': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  'Node.js': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.193-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.086.049-.139.143-.139.242v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.076.242c.558-.318 1.303-.318 1.861 0l8.794 5.076c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.601.247-.939.247z"/>
    </svg>
  ),
  'Express.js': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
    </svg>
  ),
  'JSP': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.762.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627"/>
    </svg>
  ),
  'Servlets': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.762.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/>
    </svg>
  ),
  'Flutter': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
    </svg>
  ),
  'Dart': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 011.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.341 4.105l10.498.001z"/>
    </svg>
  ),
  'Android Studio': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 14.316l4.053-2.34v4.68L12 19V14.316zm-1.002.003L6.947 16.66v-4.68l4.051-2.34v4.679zM12 6l4.053 2.34v4.679L12 10.679 7.947 13.02V8.34L12 6zm11.988 5.592L18.47 8.29V4.764L11.998 1 5.527 4.764v3.525L0 11.591l.012 6.907L5.53 21.8v-4.68l-3.506-2.025.007-3.903 3.499-2.02v8.19l6.469 3.731 6.47-3.731V9.172l3.498 2.02.008 3.903-3.507 2.025v4.68l5.518-3.302L24 11.59z"/>
    </svg>
  ),
  'Java': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.762.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627"/>
    </svg>
  ),
  'Python': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
    </svg>
  ),
  'SQL': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 17v-2.42c1.23.78 3.36 1.42 6 1.42s4.77-.64 6-1.42V17c0 .5-2.13 2-6 2s-6-1.5-6-2zm0-5v-2.42c1.23.78 3.36 1.42 6 1.42s4.77-.64 6-1.42V12c0 .5-2.13 2-6 2s-6-1.5-6-2z"/>
    </svg>
  ),
  'MySQL': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.063h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.723-1.01 1.084-1.583 1.084-.16 0-.36-.04-.6-.118v-.477c.108.022.26.033.456.033.166 0 .31-.048.43-.143.13-.107.193-.24.193-.4 0-.102-.03-.248-.09-.44l-1.066-3.998h.887l.727 2.95c.073.292.1.508.077.646.376-1.058.652-2.212.828-3.46h.86zm2.525 4.08H10.15v-5.53h.706v4.908h1.456v.622zm3.546-4.908l-.635 1.577h1.265l-.637-1.577zm-.91 2.276l-.36.918h1.425l-.363-.918h-.7zm2.06 2.63h-.813l-.32-.82h-1.63l-.34.82h-.77l1.52-3.76h.82l1.534 3.76zm-7.27 0H7.68l.79-4.906h.715l-.79 4.906zm15.326.01h-2.127v-5.53h.706v4.908h1.42v.622z"/>
    </svg>
  ),
  'Firebase': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/>
    </svg>
  ),
  'NumPy': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M10.315 4.876L6.3048 2.8517l-4.401 2.1965 4.1186 2.0683zm1.8465.9296l4.4303 2.2269-4.5765 2.2467-4.4004-2.2088zm7.7862 2.1027l-3.9053-1.9615 4.4719-2.1963 3.8328 1.8965zm-7.2565 3.6498v9.7626L4.8498 17.0548V7.4985l3.9715 1.9942v5.3624l1.7788.8442V9.965zm1.713.0275l4.3622-2.1412v9.4856l-4.3622 2.1412v-3.838l-1.7789.8727v3.838l-1.7787-.8442V13.45l3.5575-1.7463zm6.0759.0098v6.191l-3.9018 1.9177v-6.191z"/>
    </svg>
  ),
  'MATLAB': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M4.323 16.077c.345-.239 1.09-.684 1.478-1.258.666-.984 1.141-2.21 1.763-3.236.108-.178.146-.17.28-.08.73.495 1.065 1.376 1.618 2.063.208.26.323.42.632.42.22 0 .39-.125.518-.291a14.238 14.238 0 00.918-1.415c.328-.558.64-1.123.998-1.66.265-.397.587-.742.951-1.041.076-.063.136-.061.212-.013a4.78 4.78 0 011.255 1.337c.334.504.64 1.026.998 1.513.273.371.482.813.816 1.139.247.24.54.388.885.388.256 0 .513-.1.73-.25.424-.29.807-.64 1.21-.957.234-.184.47-.364.705-.548l.247-.19c.12-.092.13-.064.14.072.016.22-.025.44-.08.653-.16.622-.414 1.214-.624 1.816-.134.384-.278.764-.43 1.14-.055.138-.05.183.11.22.527.123 1.042.298 1.52.56.146.08.217.03.272-.11.328-.825.607-1.668.898-2.508.254-.736.505-1.472.705-2.225.142-.534.29-1.065.388-1.608.06-.334.105-.67.13-1.008.01-.128-.012-.175-.15-.163-.56.05-1.1.188-1.62.403-.74.306-1.428.717-2.157 1.033a8.064 8.064 0 01-1.417.49 4.024 4.024 0 01-.878.105c-.586 0-1.113-.2-1.524-.624a4.772 4.772 0 01-.635-.86c-.27-.44-.51-.897-.79-1.338-.21-.33-.462-.63-.73-.913-.18-.19-.252-.187-.42.006-.46.527-.84 1.112-1.195 1.71-.334.564-.668 1.128-1.023 1.677a5.7 5.7 0 01-.565.71.448.448 0 01-.348.162c-.276 0-.48-.2-.647-.397-.485-.572-.834-1.237-1.294-1.82a5.09 5.09 0 00-.593-.635c-.21-.19-.307-.198-.494.012-.358.4-.645.86-.915 1.322-.515.878-1.004 1.773-1.56 2.625-.416.636-.893 1.218-1.478 1.705a.283.283 0 00-.12.236c0 .17.14.31.312.31.135 0 .266-.056.388-.122z"/>
    </svg>
  ),
  'Git': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  'GitHub': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  'Linux': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12.504 0c-.155 0-.311.004-.466.012-3.712.158-7.013 2.986-7.684 6.606-.188 1.02-.235 2.195-.024 3.318.068.354.154.719.278 1.083.126.37.292.74.5 1.107.207.366.46.72.765 1.065.304.344.659.676 1.072.987.412.31.88.597 1.4.852.519.254 1.092.473 1.7.647.609.172 1.259.296 1.932.356.673.06 1.367.052 2.048-.028.68-.079 1.345-.225 1.977-.428.631-.202 1.231-.46 1.782-.762.551-.303 1.054-.65 1.498-1.033.443-.384.828-.805 1.148-1.258.32-.453.574-.936.762-1.445.188-.508.309-1.04.365-1.592.056-.551.046-1.123-.03-1.71-.076-.587-.218-1.19-.428-1.8-.21-.61-.487-1.225-.831-1.839-.343-.614-.753-1.225-1.224-1.832a11.756 11.756 0 00-1.581-1.631c-.576-.495-1.198-.941-1.859-1.338A12.45 12.45 0 0012.503 0zm-1.598 1.476a.758.758 0 01.564.225.756.756 0 01.229.546.758.758 0 01-.225.564.756.756 0 01-.546.229.758.758 0 01-.564-.225.756.756 0 01-.229-.546c0-.213.076-.397.225-.564a.759.759 0 01.546-.229zm3.193 0a.758.758 0 01.564.225.756.756 0 01.229.546.758.758 0 01-.225.564.756.756 0 01-.546.229.758.758 0 01-.564-.225.756.756 0 01-.229-.546c0-.213.076-.397.225-.564a.759.759 0 01.546-.229zm-4.783 2.006c.313 0 .577.113.79.339.213.225.32.497.32.816v1.5c0 .32-.107.592-.32.816-.213.225-.477.339-.79.339s-.576-.114-.79-.34c-.212-.224-.32-.496-.32-.815v-1.5c0-.32.108-.59.32-.816.214-.226.477-.339.79-.339zm6.387 0c.313 0 .577.113.79.339.213.225.32.497.32.816v1.5c0 .32-.107.592-.32.816-.213.225-.477.339-.79.339s-.576-.114-.79-.34c-.212-.224-.32-.496-.32-.815v-1.5c0-.32.108-.59.32-.816.214-.226.477-.339.79-.339zm-3.193 3.87c1.052 0 1.907.264 2.564.79.658.527.987 1.218.987 2.073 0 .32-.045.617-.135.893-.09.276-.224.527-.4.754a2.73 2.73 0 01-.602.59c-.225.172-.486.32-.783.443-.297.124-.627.216-.99.277a6.65 6.65 0 01-1.156.092c-.397 0-.769-.03-1.117-.092a5.135 5.135 0 01-.952-.277 3.394 3.394 0 01-.783-.443 2.73 2.73 0 01-.601-.59 2.412 2.412 0 01-.401-.754 2.624 2.624 0 01-.135-.893c0-.855.329-1.546.987-2.072.657-.527 1.512-.79 2.564-.79z"/>
    </svg>
  ),
  'Postman': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 00-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 11.847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 01-.067-.032.06.06 0 01.01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 01-.085-.039.072.072 0 01.013-.093zm-3.646 6.058a.076.076 0 01-.107 0l-.235-.235a.076.076 0 010-.107l2.355-2.355.343.343-2.356 2.354zm2.477-2.477l-.343-.343.644-.644.343.343-.644.644zm.72-.72l-.343-.343 4.652-4.652a.757.757 0 01.796-.176l-5.105 5.171z"/>
    </svg>
  ),
  'Verilog': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M4 4h16v2H4V4zm0 4h10v2H4V8zm0 4h16v2H4v-2zm0 4h10v2H4v-2zm0 4h16v2H4v-2z"/>
    </svg>
  ),
  'Nmap': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  'Canva': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.442 16.998c-.494.248-.998.37-1.498.37-1.494 0-2.491-.996-2.491-2.49 0-.997.497-1.993 1.493-2.99.996-.996 1.993-1.494 2.99-1.494.496 0 .996.125 1.492.373l.002.002c.496.248.744.62.744 1.117 0 .372-.124.682-.373.93a1.24 1.24 0 01-.928.374c-.373 0-.682-.124-.93-.373-.248-.25-.373-.558-.373-.93 0-.123.031-.248.094-.372a1.21 1.21 0 00-.745-.248c-.497 0-.995.373-1.493.993-.497.746-.746 1.492-.746 2.24 0 .994.623 1.49 1.867 1.49.498 0 .996-.124 1.494-.372.498-.25.994-.622 1.492-1.118l.746.746c-.622.622-1.244 1.12-1.866 1.494-.125.125-.25.187-.374.25-.124.062-.187.062-.25.062-.124 0-.186-.062-.249-.124a.306.306 0 01-.098-.248z"/>
    </svg>
  ),
  'Adobe Express': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425h-3.71zm.054-22.624v16.334l-5.391-13.11H4v23.4h4.628V6.617l5.39 13.107h.002l3.98 4.276h6-6.586L24 0h-9.98z"/>
    </svg>
  ),
  'Krita': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 4v12l8-6-8-6z"/>
    </svg>
  ),
  'Inkscape': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7.666 14.871c-.478.053-.94.165-1.405.24.054-.423.093-.85.175-1.268.062-.318.216-.612.269-.931.057-.339-.009-.69-.032-1.036-.017-.254-.046-.507-.069-.76l-.034-.385c-.014-.163.001-.312.159-.405.133-.079.247-.04.363.036.21.14.422.277.625.426.26.192.424.168.63-.077.128-.153.242-.318.364-.475.123-.158.244-.318.38-.463.185-.197.36-.18.53.026.264.321.512.658.794.963.234.253.502.477.748.72.077.076.147.167.198.265.123.235.02.449-.24.503-.304.063-.611.106-.917.151-.294.043-.59.077-.884.117l-.055.01c-.15.03-.253.11-.28.267-.029.17-.05.341-.065.512-.049.556-.092 1.113-.138 1.668zM11.958.002c6.617-.074 12.075 5.446 11.994 12.096-.076 6.28-5.248 11.89-12.072 11.9C5.384 24.008-.11 18.598.002 11.833.107 5.325 5.45.074 11.958.002z"/>
    </svg>
  ),
  'CapCut': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 17V7l9 5-9 5z"/>
    </svg>
  ),
  'DaVinci Resolve': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-2 4v12l8-6-8-6z"/>
    </svg>
  ),
  'After Effects': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7.324 13.859l-.72 2.955H4.402L7.503 6.27h2.441l3.136 10.544h-2.249l-.756-2.955zm2.217-1.626l-.6-2.49c-.169-.677-.338-1.513-.491-2.185h-.034c-.152.677-.287 1.522-.44 2.19l-.575 2.485zm8.076.354c0-1.039-.396-2.182-1.67-2.182-.975 0-1.772.744-1.932 1.858h-.034V8.81c0-.58-.287-.71-.744-.71H11.89v8.714h1.347v-4.48c.16-1.094.744-1.823 1.503-1.823.81 0 1.096.677 1.096 1.666v4.637h1.347v-4.637c0-1.04.016-.744.434-.59zm5.683 1.11c-.135-.59-.507-1.166-1.146-1.581v-.034c.557-.439.895-1.08.895-1.923 0-.727-.27-1.35-.76-1.789-.591-.538-1.525-.818-2.757-.818H16.87v10.544h2.912c1.232 0 2.203-.287 2.845-.785.607-.473.93-1.173.93-2.032 0-.609-.168-1.153-.438-1.582h-.035zm-2.47-4.723c.709 0 1.366.236 1.366 1.096 0 .777-.538 1.182-1.366 1.182h-1.23v-2.278h1.23zm.169 6.925h-1.4v-2.739h1.4c.86 0 1.534.354 1.534 1.333 0 1.013-.709 1.406-1.534 1.406z"/>
    </svg>
  ),
  'MVC Architecture': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zM3 15h6v6H3v-6zm12 0h6v6h-6v-6zM12 9v6m-3-3h6"/>
    </svg>
  ),
  'Database Design': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.59 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zM6 17v-2.42c1.23.78 3.36 1.42 6 1.42s4.77-.64 6-1.42V17c0 .5-2.13 2-6 2s-6-1.5-6-2zm0-5v-2.42c1.23.78 3.36 1.42 6 1.42s4.77-.64 6-1.42V12c0 .5-2.13 2-6 2s-6-1.5-6-2z"/>
    </svg>
  ),
  'API Development': () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"/>
    </svg>
  ),
};

// Tech stack data with icons and descriptions
const technicalSkills = [
  {
    category: 'Web Development',
    icon: Globe,
    technologies: [
      { name: 'HTML', description: 'Semantic markup & accessibility' },
      { name: 'CSS', description: 'Responsive styling & animations' },
      { name: 'JavaScript', description: 'Interactive web applications' },
      { name: 'Node.js', description: 'Server-side JavaScript runtime' },
      { name: 'Express.js', description: 'Web application framework' },
      { name: 'JSP', description: 'Java Server Pages' },
      { name: 'Servlets', description: 'Java web components' },
    ],
  },
  {
    category: 'App Development',
    icon: Smartphone,
    technologies: [
      { name: 'Flutter', description: 'Cross-platform UI toolkit' },
      { name: 'Dart', description: 'Client-optimized language' },
      { name: 'Android Studio', description: 'Android IDE & tools' },
    ],
  },
  {
    category: 'Languages & Backend',
    icon: Code2,
    technologies: [
      { name: 'Java', description: 'Enterprise applications' },
      { name: 'Python', description: 'Data science & automation' },
      { name: 'SQL', description: 'Database queries' },
      { name: 'MySQL', description: 'Relational database' },
      { name: 'Firebase', description: 'Backend-as-a-Service' },
      { name: 'NumPy', description: 'Scientific computing' },
      { name: 'MATLAB', description: 'Technical computing' },
    ],
  },
  {
    category: 'Tools & Systems',
    icon: Terminal,
    technologies: [
      { name: 'Git', description: 'Version control' },
      { name: 'GitHub', description: 'Code collaboration' },
      { name: 'Linux', description: 'Operating system' },
      { name: 'Postman', description: 'API testing' },
      { name: 'Verilog', description: 'Hardware description' },
      { name: 'Nmap', description: 'Network security' },
    ],
  },
];

const creativeSkills = [
  {
    category: 'Design Tools',
    icon: Palette,
    technologies: [
      { name: 'Canva', description: 'Graphic design platform' },
      { name: 'Adobe Express', description: 'Quick content creation' },
      { name: 'Krita', description: 'Digital painting' },
      { name: 'Inkscape', description: 'Vector graphics' },
    ],
  },
  {
    category: 'Video Editing & Multimedia',
    icon: Video,
    technologies: [
      { name: 'CapCut', description: 'Quick video editing' },
      { name: 'DaVinci Resolve', description: 'Professional color grading' },
      { name: 'After Effects', description: 'Motion graphics' },
    ],
  },
  {
    category: 'Architecture & Systems',
    icon: Layers,
    technologies: [
      { name: 'MVC Architecture', description: 'Design pattern' },
      { name: 'Database Design', description: 'Data modeling' },
      { name: 'API Development', description: 'RESTful services' },
    ],
  },
];

// Tech item component with logo and hover effects
const TechItem = ({ tech }: { tech: { name: string; description: string } }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const IconComponent = TechIcons[tech.name];

  const handleMouseEnter = () => {
    anime({
      targets: itemRef.current,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutCubic',
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: itemRef.current,
      scale: 1,
      duration: 200,
      easing: 'easeOutCubic',
    });
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group/tech relative flex items-center gap-2 px-3 py-2 bg-secondary/30 hover:bg-primary/10 border border-primary/10 hover:border-primary/40 rounded-lg transition-colors duration-300 cursor-default"
    >
      {IconComponent && (
        <span className="text-primary/70 group-hover/tech:text-primary transition-colors duration-300">
          <IconComponent />
        </span>
      )}
      <span className="text-sm font-medium text-foreground/80 group-hover/tech:text-foreground transition-colors duration-300">
        {tech.name}
      </span>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-background border border-primary/20 rounded-lg text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow-xl">
        {tech.description}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary/20" />
      </div>
    </div>
  );
};

// Category card component
const CategoryCard = ({ category, isCreative = false }: { category: typeof technicalSkills[0]; isCreative?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = category.icon;

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      translateY: -4,
      duration: 300,
      easing: 'easeOutCubic',
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      translateY: 0,
      duration: 300,
      easing: 'easeOutCubic',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group glass-card-hover p-6 border border-primary/10 hover:border-primary/30 transition-colors duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">{category.category}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.technologies.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
};

const experiences = [
  {
    id: 1,
    role: 'Junior Associate',
    company: 'Weber Innovations',
    period: 'August 2025 - Present',
    description: 'Design and execution of visual assets for digital campaigns with marketing collaboration.',
    achievements: ['Visual Design', 'Campaign Strategy', 'Brand Management'],
  },
  {
    id: 2,
    role: 'Advertisement Head',
    company: 'MUNify',
    period: 'July 2024 - Nov 2024',
    description: 'Led social media campaigns and digital marketing strategies for Model UN startup.',
    achievements: ['Social Media Strategy', 'Ad Creative Design', 'Engagement Growth'],
  },
  {
    id: 3,
    role: 'Freelance Frontend Developer',
    company: 'Self-employed',
    period: 'December 2024 - Present',
    description: 'Designed and developed responsive websites with clean UI and mobile-first approach.',
    achievements: ['Web Development', 'Client Management', 'Responsive Design'],
  },
];

export default function Press() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            anime({
              targets: sectionRef.current?.querySelector('.section-title'),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
            });

            // Animate timeline items
            anime({
              targets: timelineRef.current?.querySelectorAll('.timeline-item'),
              opacity: [0, 1],
              translateX: [-50, 0],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: anime.stagger(200, { start: 300 }),
            });

            // Animate skills cards
            anime({
              targets: skillsRef.current?.querySelectorAll('.skill-card'),
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              easing: 'easeOutExpo',
              duration: 800,
              delay: anime.stagger(150, { start: 800 }),
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="press" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 section-title opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Experience & Skills
          </h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        {/* Experience Timeline */}
        <div ref={timelineRef} className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="timeline-item group border-l-4 border-primary/30 hover:border-primary transition-all duration-300 pl-6 opacity-0 relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background group-hover:scale-125 transition-all duration-300" />

              <div className="glass-card-hover p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-mono">{exp.role}</h3>
                    <p className="text-sm text-secondary font-mono">@ {exp.company}</p>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono whitespace-nowrap">{exp.period}</p>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                {/* Achievements/Skills */}
                <div className="flex flex-wrap gap-2">
                  {exp.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="px-3 py-1 text-xs font-mono border border-primary/30 text-primary rounded hover:border-primary/60 hover:bg-primary/10 transition-colors"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div ref={skillsRef} className="mt-20 space-y-12">
          {/* Technical Skills Header */}
          <div className="skill-card opacity-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Technical Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSkills.map((category) => (
                <CategoryCard key={category.category} category={category} />
              ))}
            </div>
          </div>

          {/* Design & Creative Skills Header */}
          <div className="skill-card opacity-0">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Design & Creative Skills</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creativeSkills.map((category) => (
                <CategoryCard key={category.category} category={category} isCreative />
              ))}
            </div>
          </div>
        </div>

        {/* Featured stat */}
        <div className="mt-16 glass-card-hover p-8 border-l-4 border-primary">
          <p className="text-sm text-primary mb-2">Core Expertise</p>
          <p className="text-2xl font-bold text-foreground mb-2">
            Developer & Entrepreneur
          </p>
          <p className="text-muted-foreground">
            With expertise spanning web development, mobile apps, design, and video production, I build complete
            digital experiences from concept to deployment.
          </p>
        </div>
      </div>
    </section>
  );
}
