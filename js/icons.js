/**
 * Windows XP Vector Icon Library
 * High-definition, scalable SVG replicas of classic Windows XP icons.
 */
const XPIcons = {
  get(name, size = 32) {
    const icons = {
      'start-flag': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <path d="M4 6C9 4 12 8 16 6C16 11 16 13 16 15C12 17 9 13 4 15Z" fill="url(#flag-red)"/>
          <path d="M17 5.5C21 3.5 24 7.5 28 5.5C28 10.5 28 12.5 28 14.5C24 16.5 21 12.5 17 14.5Z" fill="url(#flag-green)"/>
          <path d="M4 16C9 14 12 18 16 16C16 21 16 23 16 25C12 27 9 23 4 25Z" fill="url(#flag-blue)"/>
          <path d="M17 15.5C21 13.5 24 17.5 28 15.5C28 20.5 28 22.5 28 24.5C24 26.5 21 22.5 17 24.5Z" fill="url(#flag-yellow)"/>
          <defs>
            <linearGradient id="flag-red" x1="4" y1="4" x2="16" y2="15" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF5D38"/><stop offset="1" stop-color="#D31010"/>
            </linearGradient>
            <linearGradient id="flag-green" x1="17" y1="3.5" x2="28" y2="14.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#80E040"/><stop offset="1" stop-color="#469C10"/>
            </linearGradient>
            <linearGradient id="flag-blue" x1="4" y1="14" x2="16" y2="25" gradientUnits="userSpaceOnUse">
              <stop stop-color="#3FA6FF"/><stop offset="1" stop-color="#0055D4"/>
            </linearGradient>
            <linearGradient id="flag-yellow" x1="17" y1="13.5" x2="28" y2="24.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFDE33"/><stop offset="1" stop-color="#F29E02"/>
            </linearGradient>
          </defs>
        </svg>`,

      'my-computer': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Monitor stand -->
          <path d="M11 25H21V27H11Z" fill="#758291"/>
          <path d="M8 27H24V29H8Z" fill="#4B5664"/>
          <!-- Monitor bezel -->
          <rect x="3" y="4" width="26" height="20" rx="2" fill="url(#comp-bezel)" stroke="#5B6B7C" stroke-width="1"/>
          <!-- Monitor screen -->
          <rect x="5" y="6" width="22" height="15" rx="1" fill="url(#comp-screen)"/>
          <!-- Screen glow/content -->
          <path d="M5 6L20 6L14 15L5 15Z" fill="white" opacity="0.25"/>
          <circle cx="16" cy="13.5" r="3" fill="#69B4FF" opacity="0.8"/>
          <!-- Power LED -->
          <circle cx="25" cy="22.5" r="1" fill="#47D947"/>
          <defs>
            <linearGradient id="comp-bezel" x1="3" y1="4" x2="29" y2="24" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E2E7ED"/><stop offset="1" stop-color="#9EABB8"/>
            </linearGradient>
            <linearGradient id="comp-screen" x1="5" y1="6" x2="27" y2="21" gradientUnits="userSpaceOnUse">
              <stop stop-color="#1E65C0"/><stop offset="1" stop-color="#0B2E6A"/>
            </linearGradient>
          </defs>
        </svg>`,

      'my-documents': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Back folder tab -->
          <path d="M4 7C4 5.9 4.9 5 6 5H13L15 8H26C27.1 8 28 8.9 28 10V24C28 25.1 27.1 26 26 26H6C4.9 26 4 25.1 4 24V7Z" fill="url(#doc-back)"/>
          <!-- Sheet of paper sticking out -->
          <rect x="8" y="9" width="16" height="13" rx="1" fill="white" stroke="#B0C2D6" stroke-width="0.8"/>
          <line x1="11" y1="13" x2="21" y2="13" stroke="#5A88C5" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="11" y1="16" x2="19" y2="16" stroke="#90A8C7" stroke-width="1.2" stroke-linecap="round"/>
          <line x1="11" y1="19" x2="17" y2="19" stroke="#90A8C7" stroke-width="1.2" stroke-linecap="round"/>
          <!-- Front folder flap -->
          <path d="M3 13C3 11.9 3.9 11 5 11H27C28.1 11 29 11.9 29 13L27.5 25C27.5 26.1 26.6 27 25.5 27H6.5C5.4 27 4.5 26.1 4.5 25L3 13Z" fill="url(#doc-front)" stroke="#B8860B" stroke-width="0.5"/>
          <defs>
            <linearGradient id="doc-back" x1="4" y1="5" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E5A726"/><stop offset="1" stop-color="#B27B00"/>
            </linearGradient>
            <linearGradient id="doc-front" x1="3" y1="11" x2="29" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFDD6B"/><stop offset="0.6" stop-color="#FFC233"/><stop offset="1" stop-color="#DE9700"/>
            </linearGradient>
          </defs>
        </svg>`,

      'notepad': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Blue cover spine -->
          <rect x="5" y="3" width="22" height="26" rx="2" fill="url(#np-cover)" stroke="#19559B" stroke-width="0.8"/>
          <!-- Inner notepad paper -->
          <rect x="7" y="5" width="18" height="22" rx="1" fill="#FEFDF2"/>
          <line x1="7" y1="9" x2="25" y2="9" stroke="#F18080" stroke-width="0.8"/>
          <line x1="10" y1="13" x2="22" y2="13" stroke="#9BB2C9" stroke-width="0.8"/>
          <line x1="10" y1="16" x2="22" y2="16" stroke="#9BB2C9" stroke-width="0.8"/>
          <line x1="10" y1="19" x2="19" y2="19" stroke="#9BB2C9" stroke-width="0.8"/>
          <line x1="10" y1="22" x2="17" y2="22" stroke="#9BB2C9" stroke-width="0.8"/>
          <!-- Pencil laying across -->
          <g transform="translate(14, 12) rotate(35)">
            <rect x="0" y="0" width="16" height="4" rx="1" fill="#F8C430" stroke="#B87C00" stroke-width="0.5"/>
            <path d="M16 0L20 2L16 4Z" fill="#D99B66"/>
            <path d="M19 1.5L20 2L19 2.5Z" fill="#202020"/>
            <rect x="-3" y="0" width="3" height="4" fill="#F06060"/>
          </g>
          <defs>
            <linearGradient id="np-cover" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
              <stop stop-color="#3985DF"/><stop offset="1" stop-color="#164F9A"/>
            </linearGradient>
          </defs>
        </svg>`,

      'cmd': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Window chrome -->
          <rect x="3" y="4" width="26" height="24" rx="2" fill="#1C1D1E" stroke="#5E6875" stroke-width="1"/>
          <path d="M3 6C3 4.9 3.9 4 5 4H27C28.1 4 29 4.9 29 6V9H3V6Z" fill="url(#cmd-title)"/>
          <text x="6" y="8" font-family="monospace" font-size="4" font-weight="bold" fill="white">C:\_</text>
          <!-- Terminal text lines -->
          <text x="6" y="16" font-family="monospace" font-size="5" fill="#4DF04D">&gt; amaru</text>
          <text x="6" y="22" font-family="monospace" font-size="4.5" fill="#EEEEEE">C:\dev&gt;_</text>
          <rect x="20" y="18.5" width="3" height="4" fill="#EEEEEE"/>
          <defs>
            <linearGradient id="cmd-title" x1="3" y1="4" x2="29" y2="9" gradientUnits="userSpaceOnUse">
              <stop stop-color="#0058EE"/><stop offset="1" stop-color="#2D7FF9"/>
            </linearGradient>
          </defs>
        </svg>`,

      'ie': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Big Blue E with halo -->
          <ellipse cx="16" cy="16" rx="12" ry="12" fill="url(#ie-blue)"/>
          <path d="M16 8C11 8 8 11.5 8 16C8 20.5 11 24 16 24C20 24 23 21.5 23.8 18H15V14H24C23.6 10.5 20.5 8 16 8ZM13 13.5C13 12 14.5 11 16 11C17.5 11 19 12 19 13.5H13Z" fill="white"/>
          <!-- Golden orbit swoosh -->
          <path d="M2 19C7 9 25 3 30 11C31 13 29 16 26 17C20 19 10 21 2 19Z" fill="url(#ie-gold)" opacity="0.9"/>
          <path d="M30 11C25 21 7 27 2 19C1 17 3 14 6 13C12 11 22 9 30 11Z" fill="url(#ie-gold-dark)" opacity="0.65"/>
          <defs>
            <linearGradient id="ie-blue" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stop-color="#369CFE"/><stop offset="1" stop-color="#0B54B8"/>
            </linearGradient>
            <linearGradient id="ie-gold" x1="2" y1="3" x2="30" y2="19" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFE86B"/><stop offset="1" stop-color="#E29200"/>
            </linearGradient>
            <linearGradient id="ie-gold-dark" x1="2" y1="13" x2="30" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7A800"/><stop offset="1" stop-color="#9C5200"/>
            </linearGradient>
          </defs>
        </svg>`,

      'msn': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Green Buddy -->
          <circle cx="12" cy="11" r="5" fill="url(#msn-green)"/>
          <path d="M5 26C5 21 8 18 12 18C16 18 19 21 19 26Z" fill="url(#msn-green)"/>
          <!-- Blue Buddy -->
          <circle cx="21" cy="9" r="4.5" fill="url(#msn-blue)"/>
          <path d="M15 24C15 19.5 17.5 17 21 17C24.5 17 27 19.5 27 24Z" fill="url(#msn-blue)"/>
          <defs>
            <linearGradient id="msn-green" x1="5" y1="6" x2="19" y2="26" gradientUnits="userSpaceOnUse">
              <stop stop-color="#8BE83A"/><stop offset="1" stop-color="#469911"/>
            </linearGradient>
            <linearGradient id="msn-blue" x1="15" y1="4.5" x2="27" y2="24" gradientUnits="userSpaceOnUse">
              <stop stop-color="#48ACF8"/><stop offset="1" stop-color="#0D5BB5"/>
            </linearGradient>
          </defs>
        </svg>`,

      'skills': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Microchip/Gear XP Style -->
          <rect x="6" y="6" width="20" height="20" rx="3" fill="url(#chip-grad)" stroke="#175F38" stroke-width="1"/>
          <!-- Chip Pins -->
          <line x1="10" y1="3" x2="10" y2="6" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="16" y1="3" x2="16" y2="6" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="22" y1="3" x2="22" y2="6" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="10" y1="26" x2="10" y2="29" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="16" y1="26" x2="16" y2="29" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="22" y1="26" x2="22" y2="29" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="3" y1="10" x2="6" y2="10" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="3" y1="16" x2="6" y2="16" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="3" y1="22" x2="6" y2="22" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="26" y1="10" x2="29" y2="10" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="26" y1="16" x2="29" y2="16" stroke="#D3A728" stroke-width="1.8"/>
          <line x1="26" y1="22" x2="29" y2="22" stroke="#D3A728" stroke-width="1.8"/>
          <!-- Inner Core with lightning -->
          <rect x="10" y="10" width="12" height="12" rx="1" fill="#18232B"/>
          <path d="M17 11L13 17H16L15 21L19 15H16L17 11Z" fill="#FFE240"/>
          <defs>
            <linearGradient id="chip-grad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2D9A5B"/><stop offset="1" stop-color="#11552C"/>
            </linearGradient>
          </defs>
        </svg>`,

      'paint': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Artist Palette -->
          <path d="M16 4C8.5 4 4 9 4 16C4 23 9 27 15 27C17 27 18.5 25.5 18.5 23.5C18.5 22.5 18 21.8 17.5 21C17 20.2 16.5 19.5 16.5 18.5C16.5 17 17.8 15.8 19.2 15.8H22C26 15.8 28 12.8 28 8.8C28 5.8 22.5 4 16 4Z" fill="url(#paint-wood)" stroke="#8A5A20" stroke-width="1"/>
          <!-- Thumb hole -->
          <ellipse cx="23" cy="22" rx="2" ry="3" fill="#D69B56" stroke="#7A4E1B" stroke-width="0.8"/>
          <!-- Color dabs -->
          <circle cx="9" cy="11" r="2" fill="#E82424"/>
          <circle cx="14" cy="8" r="2" fill="#3290FF"/>
          <circle cx="20" cy="9" r="2" fill="#FFE02E"/>
          <circle cx="10" cy="17" r="2" fill="#38C442"/>
          <circle cx="12" cy="22" r="2" fill="#8842DE"/>
          <!-- Brush -->
          <g transform="translate(14, 8) rotate(40)">
            <rect x="0" y="0" width="18" height="2.5" fill="#783A14" rx="0.5"/>
            <rect x="14" y="-0.5" width="4" height="3.5" fill="#C0C0C0"/>
            <path d="M18 -0.5L22 1.25L18 3Z" fill="#1C1C1C"/>
          </g>
          <defs>
            <linearGradient id="paint-wood" x1="4" y1="4" x2="28" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F2C58A"/><stop offset="1" stop-color="#C78A44"/>
            </linearGradient>
          </defs>
        </svg>`,

      'minesweeper': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- XP 3D Button Tile -->
          <rect x="3" y="3" width="26" height="26" rx="2" fill="#C0C0C0" stroke="#808080" stroke-width="1"/>
          <path d="M3 3H29V6H6V29H3V3Z" fill="white"/>
          <path d="M29 29H3V26H26V3H29V29Z" fill="#505050"/>
          <!-- Classic Mine/Bomb -->
          <circle cx="16" cy="16" r="6" fill="#111111"/>
          <circle cx="14" cy="14" r="1.5" fill="white" opacity="0.8"/>
          <!-- Spikes -->
          <line x1="16" y1="6" x2="16" y2="26" stroke="#111111" stroke-width="2"/>
          <line x1="6" y1="16" x2="26" y2="16" stroke="#111111" stroke-width="2"/>
          <line x1="9" y1="9" x2="23" y2="23" stroke="#111111" stroke-width="2"/>
          <line x1="9" y1="23" x2="23" y2="9" stroke="#111111" stroke-width="2"/>
        </svg>`,

      'media-player': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" fill="url(#wmp-outer)" stroke="#143464" stroke-width="1"/>
          <circle cx="16" cy="16" r="9.5" fill="url(#wmp-inner)"/>
          <!-- Play triangle -->
          <path d="M13 11L21 16L13 21Z" fill="url(#wmp-play)" stroke="#D87800" stroke-width="0.5"/>
          <defs>
            <linearGradient id="wmp-outer" x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
              <stop stop-color="#4C88E8"/><stop offset="1" stop-color="#15428B"/>
            </linearGradient>
            <linearGradient id="wmp-inner" x1="7" y1="7" x2="25" y2="25" gradientUnits="userSpaceOnUse">
              <stop stop-color="#122748"/><stop offset="1" stop-color="#2D5A9C"/>
            </linearGradient>
            <linearGradient id="wmp-play" x1="13" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFBA3B"/><stop offset="1" stop-color="#FA7A05"/>
            </linearGradient>
          </defs>
        </svg>`,

      'recycle-bin': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <!-- Wastebasket body -->
          <path d="M8 8L10 27H22L24 8H8Z" fill="url(#bin-glass)" stroke="#4A75A0" stroke-width="1"/>
          <!-- Rim -->
          <ellipse cx="16" cy="8" rx="8" ry="2.5" fill="#D3E4F5" stroke="#4A75A0" stroke-width="1"/>
          <!-- Grid mesh pattern -->
          <line x1="12" y1="9" x2="13" y2="26" stroke="#689AC4" stroke-width="0.8"/>
          <line x1="16" y1="9" x2="16" y2="26" stroke="#689AC4" stroke-width="0.8"/>
          <line x1="20" y1="9" x2="19" y2="26" stroke="#689AC4" stroke-width="0.8"/>
          <line x1="9" y1="14" x2="23" y2="14" stroke="#689AC4" stroke-width="0.8"/>
          <line x1="10" y1="20" x2="22" y2="20" stroke="#689AC4" stroke-width="0.8"/>
          <!-- Crumpled paper inside -->
          <path d="M12 7L17 5L19 9L15 11Z" fill="#FFF" stroke="#B0C2D6" stroke-width="0.5"/>
          <path d="M14 6L16 4L18 7Z" fill="#FFF"/>
          <defs>
            <linearGradient id="bin-glass" x1="8" y1="8" x2="24" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EAF3FC" stop-opacity="0.85"/><stop offset="1" stop-color="#99C2E8" stop-opacity="0.9"/>
            </linearGradient>
          </defs>
        </svg>`,

      'control-panel': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="5" width="24" height="22" rx="2" fill="url(#cp-bg)" stroke="#45668C" stroke-width="1"/>
          <!-- Sliders and dials -->
          <rect x="7" y="9" width="18" height="2" rx="1" fill="#4B6682"/>
          <circle cx="12" cy="10" r="3" fill="#3D92F5" stroke="white" stroke-width="0.8"/>
          <rect x="7" y="15" width="18" height="2" rx="1" fill="#4B6682"/>
          <circle cx="19" cy="16" r="3" fill="#47C75A" stroke="white" stroke-width="0.8"/>
          <rect x="7" y="21" width="18" height="2" rx="1" fill="#4B6682"/>
          <circle cx="15" cy="22" r="3" fill="#F5A42A" stroke="white" stroke-width="0.8"/>
          <defs>
            <linearGradient id="cp-bg" x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFFFFF"/><stop offset="1" stop-color="#D6E3F0"/>
            </linearGradient>
          </defs>
        </svg>`,

      'folder': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <path d="M3 6C3 4.9 3.9 4 5 4H12L14 7H27C28.1 7 29 7.9 29 9V23C29 24.1 28.1 25 27 25H5C3.9 25 3 24.1 3 23V6Z" fill="url(#f-back)"/>
          <path d="M2 11C2 9.9 2.9 9 4 9H28C29.1 9 30 9.9 30 11L28 25C28 26.1 27.1 27 26 27H6C4.9 27 4 26.1 4 25L2 11Z" fill="url(#f-front)" stroke="#B8860B" stroke-width="0.5"/>
          <defs>
            <linearGradient id="f-back" x1="3" y1="4" x2="29" y2="25" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E5A726"/><stop offset="1" stop-color="#B27B00"/>
            </linearGradient>
            <linearGradient id="f-front" x1="2" y1="9" x2="30" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFDD6B"/><stop offset="0.6" stop-color="#FFC233"/><stop offset="1" stop-color="#DE9700"/>
            </linearGradient>
          </defs>
        </svg>`,

      'shield': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <path d="M16 3L27 7V16C27 22.5 22 27.5 16 29C10 27.5 5 22.5 5 16V7L16 3Z" fill="url(#shield-grad)" stroke="#1F5EA6" stroke-width="1"/>
          <path d="M16 6L24 9.5V16C24 21 20.5 25 16 26.3C11.5 25 8 21 8 16V9.5L16 6Z" fill="url(#shield-inner)"/>
          <path d="M14 17.5L11.5 15L10 16.5L14 20.5L22 12.5L20.5 11L14 17.5Z" fill="#FFF"/>
          <defs>
            <linearGradient id="shield-grad" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
              <stop stop-color="#3FA6FF"/><stop offset="1" stop-color="#004DAA"/>
            </linearGradient>
            <linearGradient id="shield-inner" x1="8" y1="6" x2="24" y2="26.3" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2D7AE0"/><stop offset="1" stop-color="#0D4487"/>
            </linearGradient>
          </defs>
        </svg>`,

      'cloud': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <path d="M9 22C6.8 22 5 20.2 5 18C5 15.9 6.6 14.2 8.6 14C9.5 10.6 12.5 8 16.2 8C20.6 8 24.1 11.3 24.4 15.6C26.4 16.1 28 17.8 28 20C28 22.2 26.2 24 24 24H9" fill="url(#cloud-grad)" stroke="#FF8C00" stroke-width="1.2"/>
          <text x="9" y="19" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="#232F3E">AWS</text>
          <defs>
            <linearGradient id="cloud-grad" x1="5" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFF7E6"/><stop offset="1" stop-color="#FFE4B5"/>
            </linearGradient>
          </defs>
        </svg>`,

      'user-avatar': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="4" fill="url(#avatar-bg)"/>
          <!-- Engineer silhouette / duck / chess piece XP style -->
          <circle cx="16" cy="11" r="5.5" fill="#FFE2B8" stroke="#D49A59" stroke-width="0.8"/>
          <!-- Hair & Glasses -->
          <path d="M10.5 10C10.5 7 12.5 5.5 16 5.5C19.5 5.5 21.5 7 21.5 10C21.5 9 19.5 8 16 8C12.5 8 10.5 9 10.5 10Z" fill="#3D2314"/>
          <rect x="12" y="10" width="3.5" height="2.5" rx="0.5" fill="none" stroke="#222" stroke-width="0.8"/>
          <rect x="16.5" y="10" width="3.5" height="2.5" rx="0.5" fill="none" stroke="#222" stroke-width="0.8"/>
          <line x1="15.5" y1="11" x2="16.5" y2="11" stroke="#222" stroke-width="0.8"/>
          <!-- Body / Shirt -->
          <path d="M8 28C8 22.5 11.5 19 16 19C20.5 19 24 22.5 24 28Z" fill="#1C5FB0" stroke="#0F3C75" stroke-width="0.8"/>
          <polygon points="16,19 14.5,23 17.5,23" fill="#FFF"/>
          <polygon points="16,22 17.5,28 14.5,28" fill="#D32F2F"/>
          <defs>
            <linearGradient id="avatar-bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F2F6FA"/><stop offset="1" stop-color="#B8CEE4"/>
            </linearGradient>
          </defs>
        </svg>`,

      'github': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="4" fill="#24292E"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6C10.5 6 6 10.5 6 16C6 20.4 8.9 24.2 12.8 25.5C13.3 25.6 13.5 25.3 13.5 25C13.5 24.8 13.5 24 13.5 23C10.7 23.6 10.1 21.7 10.1 21.7C9.7 20.5 9 20.2 9 20.2C8 19.6 9.1 19.6 9.1 19.6C10.2 19.7 10.8 20.8 10.8 20.8C11.8 22.5 13.4 22 14 21.7C14.1 21 14.4 20.5 14.7 20.2C12.5 20 10.1 19.1 10.1 15.3C10.1 14.2 10.5 13.3 11.1 12.6C11 12.3 10.7 11.2 11.2 9.9C11.2 9.9 12.1 9.6 14.1 10.9C14.9 10.7 15.8 10.6 16.7 10.6C17.6 10.6 18.5 10.7 19.3 10.9C21.3 9.6 22.2 9.9 22.2 9.9C22.7 11.2 22.4 12.3 22.3 12.6C23 13.3 23.4 14.2 23.4 15.3C23.4 19.1 21 20 18.7 20.2C19.1 20.5 19.5 21.2 19.5 22.3C19.5 23.9 19.5 24.8 19.5 25C19.5 25.3 19.7 25.6 20.2 25.5C24.1 24.2 27 20.4 27 16C27 10.5 22.5 6 16 6Z" fill="white"/>
        </svg>`,

      'linkedin': `
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="4" fill="#0077B5"/>
          <path d="M9 13H12.5V24H9V13ZM10.75 8C9.5 8 8.5 9 8.5 10.2C8.5 11.4 9.5 12.4 10.75 12.4C12 12.4 13 11.4 13 10.2C13 9 12 8 10.75 8ZM14.5 13H18V14.6C18.5 13.7 19.7 12.7 21.5 12.7C25.2 12.7 26 15 26 18.3V24H22.5V18.8C22.5 17.2 22.1 16 20.5 16C18.9 16 18 17.1 18 18.8V24H14.5V13Z" fill="white"/>
        </svg>`,

      'sound': `
        <svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
          <path d="M2 5H5L9 2V14L5 11H2V5Z" fill="#FFF"/>
          <path d="M11 5C12 6.5 12 9.5 11 11" stroke="#FFF" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M13 3C15 5.5 15 10.5 13 13" stroke="#FFF" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,

      'sound-mute': `
        <svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none">
          <path d="M2 5H5L9 2V14L5 11H2V5Z" fill="#BBB"/>
          <line x1="11" y1="5" x2="15" y2="11" stroke="#F55" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="15" y1="5" x2="11" y2="11" stroke="#F55" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`
    };

    return icons[name] || icons['folder'];
  }
};

window.XPIcons = XPIcons;

// Auto-populate elements with data-render-icon attribute
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-render-icon]').forEach(el => {
    const iconName = el.dataset.renderIcon;
    const size = parseInt(el.dataset.iconSize || '16', 10);
    el.innerHTML = XPIcons.get(iconName, size);
  });
});
