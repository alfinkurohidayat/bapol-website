const hide = document.querySelector('.click');
hide.addEventListener('click' , () => {
    document.querySelector('.navbar').style.display='none';
    document.querySelector('.container').style.width= '100%';
    document.querySelector('.click2').style.display='block';
})


const show = document.querySelector('.click2');
show.addEventListener('click' , () => {
    document.querySelector('.navbar').style.display='block';
    document.querySelector('.container').style.width= '80%';
    document.querySelector('.click2').style.display='none';
})


