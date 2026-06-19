document.addEventListener('DOMContentLoaded',function(){
  // Tabs
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(tab, setFocus = true){
    tabs.forEach(t=>{
      const selected = t===tab;
      t.setAttribute('aria-selected', selected);
      t.tabIndex = selected?0:-1;
    });
    panels.forEach(p=> p.hidden = p.id !== tab.getAttribute('aria-controls'));
    if(setFocus) tab.focus();
  }

  tabs.forEach((tab, idx)=>{
    tab.addEventListener('click', ()=> activateTab(tab));

    tab.addEventListener('keydown', (e)=>{
      const key = e.key;
      let newIdx = null;
      if(key === 'ArrowRight') newIdx = (idx+1)%tabs.length;
      if(key === 'ArrowLeft') newIdx = (idx-1+tabs.length)%tabs.length;
      if(key === 'Home') newIdx = 0;
      if(key === 'End') newIdx = tabs.length-1;
      if(newIdx !== null){
        e.preventDefault();
        activateTab(tabs[newIdx]);
      }
      if(key === 'Enter' || key === ' '){
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  // Ensure first tab is active on load
  const initial = tabs.find(t=>t.getAttribute('aria-selected')==='true') || tabs[0];
  activateTab(initial,false);

  // Modal (simple accessible trap)
  const modal = document.getElementById('modal');
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');
  let activeBeforeModal = null;

  function focusableElements(container){
    return Array.from(container.querySelectorAll('a[href],button:not([disabled]),textarea,select,input, [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.offsetParent !== null);
  }

  function openModal(){
    activeBeforeModal = document.activeElement;
    modal.removeAttribute('hidden');
    // trap focus
    const focusables = focusableElements(modal);
    if(focusables.length) focusables[0].focus();
    document.addEventListener('focus',enforceFocus,true);
    document.addEventListener('keydown',handleModalKeydown);
  }

  function closeModal(){
    modal.setAttribute('hidden','');
    document.removeEventListener('focus',enforceFocus,true);
    document.removeEventListener('keydown',handleModalKeydown);
    if(activeBeforeModal) activeBeforeModal.focus();
  }

  function enforceFocus(e){
    if(!modal.contains(e.target)){
      e.stopPropagation();
      const focusables = focusableElements(modal);
      if(focusables.length) focusables[0].focus();
    }
  }

  function handleModalKeydown(e){
    if(e.key === 'Escape') { closeModal(); }
    if(e.key === 'Tab'){
      const focusables = focusableElements(modal);
      if(focusables.length === 0) { e.preventDefault(); return; }
      const first = focusables[0];
      const last = focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }

  if(openBtn) openBtn.addEventListener('click', openModal);
  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  // backdrop dismissal
  modal.addEventListener('click', (e)=>{ if(e.target && e.target.dataset && e.target.dataset.dismiss) closeModal(); });
});