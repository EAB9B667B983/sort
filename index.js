function run() {
    document.querySelector('button').remove()
    var btn_left = document.createElement('button')
    var btn_right = document.createElement('button')
    var span_progress = document.createElement('p')
    var comment_progress = document.createElement('p')
    span_progress.innerText = '0.0%'
    span_progress.style.color = '#fff'
    span_progress.style.width = '90%'
    span_progress.style.background = `#000`
    comment_progress.style.width = '100%'
    const obj={
        a1:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
        a2:[[,,],[,,],[,,],[,,],[,,],[,,],[,,],[,,],[],[],[],[],[],[],[],[]],
        a3:[[,,,,],[,,,,],[,,,,],[,,,,],[,,],[,,],[,,],[,,]],
        a4:[[,,,,,,,,],[,,,,,,,,],[,,,,],[,,,,]],
        a5:[[,,,,,,,,,,,,,,,,],[,,,,,,,,]],
        a6:[[,,,,,,,,,,,,,,,,,,,,,,,,]]
    }
    const queue = []
    var popped = []
    var progress = 0
    const data = [["윤서연","SeoYeon"],["정혜린","HyeRin"],["이지우","JiWoo"],["김채연","ChaeYeon"],["김유연","YooYeon"],["김수민","SooMin"],["김나경","NaKyoung"],["공유빈","YuBin"],["카에데","Kaede"],["서다현","DaHyun"],["코토네","Kotone"],["곽연지","YeonJi"],["니엔","Nien"],["박소현","SoHyun"],["신위","Xinyu"],["마유","Mayu"],["린","Lynn"],["주빈","JooBin"],["정하연","HaYeon"],["박시온","ShiOn"],["김채원","ChaeWon"],["설린","Sullin"],["서아","SeoAh"],["지연","JiYeon"]]
    const init=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    const temp = init.map(v=>[v,Math.random()]).sort((x,y)=>x[1]-y[1]).map(v=>v[0])
    for (var i=0;i<8;i++){
        obj.a1[i].push(temp[3*i])
        obj.a1[i+8].push(temp[3*i+1])
        obj.a2[i+8].push(temp[3*i+2])
        queue.push(['a1',i,0,0])
        queue.push(['a2',i,0,0])
    }
    for (var i=0;i<4;i++) {
        queue.push(['a3',i,0,0])
    }
    for (var i=0;i<2;i++) {
        queue.push(['a4',i,0,0])
    }
    queue.push(['a5',0,0,0])
    
    function display() {
        if (queue.length==0) {
            result()
            return 0
        }
        const index = Math.floor(queue.length * Math.random())
        popped = queue[index]
        const arr = obj[popped[0]]
        const left = callData(arr[popped[1]*2][popped[2]])
        const right = callData(arr[popped[1]*2+1][popped[3]])
        if (left && right) {
            queue.splice(queue.indexOf(popped),1)
            if (Math.random()<0.5) {
                btn_left.innerHTML = `<p>${left[0]}</p><p>${left[1]}</p>`
                btn_right.innerHTML = `<p>${right[0]}</p><p>${right[1]}</p>`
                btn_left.addEventListener('click',select0)
                btn_right.addEventListener('click',select1)
            } else {
                btn_right.innerHTML = `<p>${left[0]}</p><p>${left[1]}</p>`
                btn_left.innerHTML = `<p>${right[0]}</p><p>${right[1]}</p>`
                btn_right.addEventListener('click',select0)
                btn_left.addEventListener('click',select1)
            }
            return 0
        } else {
            return 1
        }
    }
    
    function callData(key) {
        if (typeof(key)=='number') return data[key]
        if (!key) {return undefined}
        var d = String(obj[key.slice(0,2)][parseInt(key.slice(2,4))][parseInt(key.slice(4,6))])
        if (d.startsWith('a')) {
            return callData(d)
        } else {
            return data[d]
        }
    }
    
    function select(num) {
        btn_left.removeEventListener('click',select0)
        btn_right.removeEventListener('click',select0)
        btn_left.removeEventListener('click',select1)
        btn_right.removeEventListener('click',select1)
        btn_left.innerHTML = `<p>Loading</p>`
        btn_right.innerHTML = `<p>Loading</p>`
        const arrkey = popped[0]
        const arr = obj[arrkey]
        const nextarrkey = arrkey[0]+(parseInt(arrkey[1])+1)
        const win = arrkey+String(popped[1]*2+num).padStart(2,'0')+String(popped[2+num]).padStart(2,'0')
        const pushed = obj[nextarrkey][popped[1]]
        const index = pushed.filter(i=>i).length
        pushed.splice(index,0,win)
        pushed.pop()
        progress += 1
        if (arr[popped[1]*2+num].length==popped[2+num]+1) {
            for (var i=popped[3-num];i<arr[popped[1]*2+1-num].length;i++) {
                const index = pushed.filter(j=>j).length
            const lose = arrkey+String(popped[1]*2+1-num).padStart(2,'0')+String(i).padStart(2,'0')
            pushed.splice(index,0,lose)
            pushed.pop()
            progress += 1
        }
        } else {
            queue.push([popped[0],popped[1],popped[2]+1-num,popped[3]+num])
        }
        popped=[]
        span_progress.innerText = (progress*100/112).toFixed(1)+'%'
        span_progress.style.background = `linear-gradient(to right, #6e2cff ${progress*100/112}%, #000 ${progress*100/112}%)`
        while (display()) {}
        // select(0)
        return 0
    }
    
    function result() {
        btn_left.remove()
        btn_right.remove()
        const final = obj.a6[0].map(v=>callData(v))
        const content = final.map(v=>`<tr><td>${final.indexOf(v)+1}</td><td>${v.join(' ')}</td></tr>`).join('')
        var table = `<table><thead><tr><th>순위</th><th>이름</th><tr></thead><tbody>${content}</tbody></table>`
        span_progress.remove()
        comment_progress.remove()
        document.querySelector('footer').remove()
        var btn_save = document.createElement('button')
        var btn_save_wrap = document.createElement('div')
        btn_save.addEventListener('click',()=>{
            capture()
        })
        btn_save.innerHTML = '<p>저장</p><p>Save</p>'
        btn_save.style.cssText = 'margin:10px !important'
        btn_save_wrap.style.width = '100%'
        btn_save_wrap.append(btn_save)
        var tablewrap = document.createElement('table-wrap')
        tablewrap.innerHTML = table
        document.querySelector('article').append(btn_save_wrap)
        document.querySelector('article').append(tablewrap)
        document.querySelector('article').style.height = ''
    }
    
    async function capture() {
        var span = document.createElement('p')
        span.innerText = 'https://sort.wav.haus/'
        document.querySelector('table-wrap').append(span)
        var c = await html2canvas(document.querySelector('table-wrap'), {scale:2})
        span.remove()
        c.toBlob(async blob=>{
            var downloadLink = document.createElement("a");
            downloadLink.download = 'tripleS_sort_'+new Date()*1;
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.click();
        })
    }

    function select0() {
        select(0)
    }
    function select1() {
        select(1)
    }
    
    while (display()) {}

    document.querySelector('article').append(btn_left)
    document.querySelector('article').append(btn_right)
    document.querySelector('footer').append(span_progress)
    document.querySelector('footer').append(comment_progress)
}