function inst_audio(chemin, nt) {
    this.aud = new Audio('song/' +chemin+ '.ogg');
    this.note = chemin;
    this.touche = nt;
    this.touche.setAttribute("class", "polygon1");

    nt.addEventListener('mousedown', this.pl.bind(this), false);
    nt.addEventListener('mouseup', this.cls.bind(this), false);
    nt.addEventListener('mouseout', this.cls.bind(this), false);
    nt.addEventListener('mouseover', this.change.bind(this), false);
}

inst_audio.prototype.change = function () {
    if (inst_audio.prototype.etat == true) {
        this.aud.currentTime = 0;
        this.aud.play();
        this.touche.setAttribute("class", "polygon2");
    }
}

inst_audio.prototype.lol = function () {
    inst_audio.prototype.etat = false;
}

inst_audio.prototype.pl = function (e) {
    e.preventDefault();
    inst_audio.prototype.etat = true;
    this.change();
}

inst_audio.prototype.cls = function (e) {
    this.touche.setAttribute("class", "polygon1");
}

inst_audio.prototype.etat = false;

function gen(elem, $note) {
    var note = {
        sol: [0, 0, 0, 228, 37, 228, 37, 152, 20, 152, 20, 0],
        sol_n: [20, 0, 20, 152, 44, 152, 44, 0],
        la: [46, 0, 46, 152, 38, 152, 38, 228, 75, 228, 75, 153, 67, 153, 66, 0],
        la_n: [67, 0, 67, 152, 92, 152, 92, 0],
        si: [93, 0, 93, 153, 77, 153, 77, 228, 113, 228, 113, 0],
        dos: [115, 0, 115, 228, 152, 228, 152, 153, 135, 153, 134, 0],
        dos_n: [135, 0, 135, 152, 159, 152, 159, 0],
        re: [159, 0, 159, 153, 153, 153, 153, 228, 190, 228, 190, 153, 178, 153, 178, 0],
        re_n: [179, 0, 179, 152, 203, 152, 203, 0],
        mi: [204, 0, 204, 153, 192, 153, 192, 228, 228, 228, 228, 151, 221, 151, 221, 0],
        mi_n: [222, 0, 222, 150, 246, 150, 246, 0],
        fa: [245, 0, 245, 151, 229, 151, 228, 228, 265, 228, 265, 0]
    }

    var arr = ['sol', 'sol_n', 'la', 'la_n', 'si', 'dos', 'dos_n', 're', 're_n', 'mi', 'mi_n', 'fa'];
    var algo = [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1];
    var largeur = 0;
    var cran = 0;
    var cran2 = 0;
    var un_sur_2 = false;
    var svgNS = "http://www.w3.org/2000/svg";

    var el_svg = document.createElementNS(svgNS, "svg");
    el_svg.setAttribute("height", "228");
    el_svg.setAttribute("class", "polygon1");

    for (var i = 0; i < $note.length; i++) {
        if (cran == 12) {
            cran = 0;
            cran2++;
        }

        var poly = document.createElementNS(svgNS, "polygon");
        var pt = "";

        for (var j = 0; j < note[arr[cran]].length; j++) {
            if (pt == "") {
                pt += note[arr[cran]][j] + (cran2 * 267);
            } else {
                pt += un_sur_2 ? "," + (note[arr[cran]][j] + (cran2 * 267)) : "," + note[arr[cran]][j];
                un_sur_2 = un_sur_2 ? false : true;
            }
        }

        poly.setAttribute("points", pt);
        el_svg.appendChild(poly);

        largeur += algo[cran];
        cran++;
        un_sur_2 = false;

        new inst_audio($note[i], poly);
    }

    largeur = Math.round((267 / 7) * largeur) - 1;
    document.getElementById(elem).style.width = largeur + "px";
    document.getElementById(elem).parentNode.style.width = largeur + "px";
    el_svg.setAttribute("width", largeur);
    document.getElementById(elem).appendChild(el_svg);

    document.addEventListener('mouseup', function () { inst_audio.prototype.etat = false }, false);
}

window.addEventListener('load', function () {
    var note1 = ['sol1', 'sol1d', 'la1', 'la1d', 'si1', 'do2', 'do2d', 're2', 're2d', 'mi2', 'mi2d', 'fa2', 'sol2', 'sol2d', 'la2', 'la2d', 'si2', 'do3', 'do3d', 're3', 're3d', 'mi3', 'mi3d', 'fa3', 'sol3', 'sol3d', 'la3', 'la3d', 'si3', 'do4', 'do4d', 're4', 're4d', 'mi4', 'mi4d', 'fa4'];
    gen("cont_piano", note1)

    var note2 = ['sol1', 'sol1d', 'la1', 'la1d', 'si1', 'do2', 'do2d', 're2', 're2d', 'mi2', 'mi2d', 'fa2', 'sol2', 'sol2d', 'la2', 'la2d', 'si2', 'do3', 'do3d', 're3', 're3d', 'mi3', 'mi3d', 'fa3'];
    gen("cont_piano2", note2)
}, false);
