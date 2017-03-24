// $(function () {
//     var i = 0;
//     var clone = $(".banner .img_box li").first().clone();
//     $(".banner .img_box").append(clone);
//     var size = $(".banner .img_box li").size();
//     for (var j = 0; j < size - 1; j++) {
//         $(".banner .num").append("<li></li>");
//     }
//     $(".banner .num li").first().addClass("on");

//     // 鼠标划入圆点
//     $(".banner .num li").hover(function (event) {
//         var index = $(this).index();
//         i = index;
//         $(".banner .img_box").stop().animate({ left: -index * 550 }, 500);
//         $(this).addClass("on").siblings().removeClass("on");
//     })

//     // 自动轮播
//     var t = setInterval(function () {
//         i++;
//         move();
//     }, 2000);

//     // 对banner定时器操作
//     $(".banner").hover(function () {
//         clearInterval(t);
//     }, function () {
//         t = setInterval(function () {
//             i++;
//             move();
//         }, 2000);
//     });

//     // 左按钮
//     $(".banner .btn_l").click(function () {
//         i--;
//         move();
//     });
//     // 右按钮
//     $(".banner .btn_r").click(function () {
//         i++;
//         move();
//     });

//     function move() {
//         if (i == size) {
//             $(".banner .img_box").css({ left: 0 });
//             i = 1;
//         }

//         if (i == -1) {
//             $(".banner .img_box").css({ left: -(size - 1) * 550 });
//             i = size - 2;
//         }

//         $(".banner .img_box").stop().animate({ left: -i * 550 }, 500);

//         if (i == size - 1) {
//             $(".banner .num li").eq(0).addClass("on").siblings().removeClass("on");
//         } else {
//             $(".banner .num li").eq(i).addClass("on").siblings().removeClass("on");
//         }
//     }
// })

(function($) {
    function Slide($this, options) {
        this.$box = $this;
        this.$img_box = $this.find(".img_box");
        this.$point_box = $this.find(".num");
        this.current = 0;
        this.img_width = options.width;

        var clone = this.$img_box.find("li").first().clone();
        this.$img_box.append(clone);
        this.img_total = this.$img_box.find("li").size();
        this.$img_box.find("img").css({ width: $this.css("width"), height: $this.css("height") });


        for (var i = 0; i < this.img_total - 1; i++) {
            this.$point_box.append("<li></li>");
        }
        this.$point_box.find("li").first().addClass("on");

        // 鼠标划入圆点
        this.$point_box.find("li").hover(function(event) {
            if (!event.currentTarget) {
                console.log("当前浏览器不支持currentTarget");
            }
            var index = $(event.currentTarget).index();
            this.current = index;
            this.$img_box.stop().animate({ left: -this.current * this.img_width }, 500);
            $(event.currentTarget).addClass("on").siblings().removeClass("on");
        }.bind(this));

        // 自动轮播
        this.interval = setInterval(function() {
            this.current++;
            this.move();
        }.bind(this), options.speed);

        // 对banner定时器操作
        this.$box.hover(function() {
            clearInterval(this.interval);
        }.bind(this), function() {
            this.interval = setInterval(function() {
                this.current++;
                this.move();
            }.bind(this), options.speed);
        }.bind(this));

        // 左按钮
        this.$box.find(".btn_l").click(function() {
            this.current--;
            this.move();
        }.bind(this));
        // 右按钮
        this.$box.find(".btn_r").click(function() {
            this.current++;
            this.move();
        }.bind(this));

    }
    Slide.prototype.move = function() {
        if (this.current == this.img_total) {
            this.$img_box.css({ left: 0 });
            this.current = 1;
        }

        if (this.current == -1) {
            this.$img_box.css({ left: -(this.img_total - 1) * this.img_width });
            this.current = this.img_total - 2;
        }

        this.$img_box.stop().animate({ left: -this.current * this.img_width }, 500);

        if (this.current == this.img_total - 1) {
            this.$point_box.find("li").eq(0).addClass("on").siblings().removeClass("on");
        } else {
            this.$point_box.find("li").eq(this.current).addClass("on").siblings().removeClass("on");
        }
    }

    $.fn.hjSlide = function(options) {
        options = $.extend({
            width: 500,
            speed: 5000
        }, options);
        this.each(function() {
            new Slide($(this), options);
        })
        return this;
    }
}(jQuery));

$("#slide").hjSlide({ width: 550, speed: 2000 });