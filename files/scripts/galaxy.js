let ParticlesColor = "#ffffff",	// Use this to change the color of the particles (full or abbreviated, color in hexadecimal format)
	LinesColor = "#ffffff",		// Use this to change the color of the lines (full or abbreviated, color in hexadecimal format)
	LineWidth = 0.1,			// Use this to resize the lines
	NumberOfParticles = 0.1,	// Use this to change the number of displayed particles
	Distance = 100,				// Use this to change the particle capture distance by lines
	DistanceRadius = 150,		// ^
	SpeedParticles = 30;		// Use this to change the velocity of the particles moving
window.isMobile = function(){var i, t = !1;},
$(function() {
    var o = document.querySelector("canvas")
      , n = o.getContext("2d")
      , r = ParticlesColor
      , d = LinesColor;
    o.width = window.innerWidth,
    o.height = window.innerHeight,
    o.style.display = "block",
    n.fillStyle = r,
    n.lineWidth = LineWidth,
    n.strokeStyle = d;
    var t, e = {
        x: -9999,
        y: -9999
    }, s = {
        nb: NumberOfParticles * $(window).width(),
        distance: Distance,
        d_radius: DistanceRadius,
        array: []
    };
    function a() {
        this.x = Math.random() * o.width,
        this.y = Math.random() * o.height,
        this.vx = -.5 + Math.random(),
        this.vy = -.5 + Math.random(),
        this.radius = Math.random()
    }
    function c() {
        for (n.clearRect(0, 0, o.width, o.height),
        i = s.array.length; i < s.nb; i++)
            s.array.push(new a),
            (t = s.array[i]).create();
        t.line(),
        t.animate()
    }
    a.prototype = {
        create: function() {
            n.beginPath(),
            n.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !1),
            n.fill()
        },
        animate: function() {
            for (i = 0; i < s.nb; i++) {
                var t = s.array[i];
                t.y < 0 || t.y > o.height ? (t.vx = t.vx,
                t.vy = -t.vy) : (t.x < 0 || t.x > o.width) && (t.vx = -t.vx,
                t.vy = t.vy),
                t.x += t.vx,
                t.y += t.vy,
                n.beginPath(),
                n.arc(t.x, t.y, t.radius, 0, 2 * Math.PI, !1),
                n.fill()
            }
        },
        line: function() {
            for (i = 0; i < s.nb; i++)
                for (j = 0; j < s.nb; j++)
                    i_dot = s.array[i],
                    j_dot = s.array[j],
                    i_dot.x - j_dot.x < s.distance && i_dot.y - j_dot.y < s.distance && i_dot.x - j_dot.x > -s.distance && i_dot.y - j_dot.y > -s.distance && i_dot.x - e.x < s.d_radius && i_dot.y - e.y < s.d_radius && i_dot.x - e.x > -s.d_radius && i_dot.y - e.y > -s.d_radius && (n.beginPath(),
                    n.moveTo(i_dot.x, i_dot.y),
                    n.lineTo(j_dot.x, j_dot.y),
                    n.stroke(),
                    n.closePath())
        }
    },
    $("body").on("mousemove mouseleave", function(i) {
        if ("mousemove" == i.type) {
            if (isMobile())
                return;
            e.x = i.pageX,
            e.y = i.pageY
        }
        "mouseleave" == i.type && (e.x = 2 * o.width,
        e.y = 2 * o.height)
    }),
    $(window).resize(function() {
        clearInterval(h);
        var t = o.width
          , e = o.height;
        for (s.nb = NumberOfParticles * $(window).width(),
        c(),
        o.width = window.innerWidth,
        o.height = window.innerHeight,
        n.fillStyle = r,
        n.lineWidth = LineWidth,
        n.strokeStyle = d,
        i = 0; i < s.nb; i++) {
            var a = s.array[i];
            a.x = a.x / t * o.width,
            a.y = a.y / e * o.height
        }
        c(),
        h = setInterval(c, 1e3 / SpeedParticles)
    });
    var h = setInterval(c, 1e3 / SpeedParticles);
    c()
});