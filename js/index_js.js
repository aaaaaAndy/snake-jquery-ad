/**
 * Created by yuan.wang on 2017/7/26.
 */

$(function () {
    var dir = 'right';
    var snake_arr = [[1,0],[0,0]];
    var xx = 0;
    var yy = 0;
    var timm = 0;
    var snake_score = 0;
    var sped = 200;

    $(document).keydown(function (ev) {
        /*console.log(ev.keyCode);*/
        //console.log(ev.keyCode);
        var keynum = event.keyCode || window.event.keyCode;


        //console.log(keynum);

        /* 对按键事件作出相应，同时判断如果蛇直接倒退则按键无效
        * */
        switch (keynum)
        {

            case 37:
                //console.log(key_number);
                if (snake_arr[0][0]>snake_arr[1][0])
                {
                    dir='right';
                }else
                {
                    dir = 'left';
                }
                break;
            case 38:
                if(snake_arr[0][1]>snake_arr[1][1])
                {
                    dir = 'down';
                }else{
                    dir = 'up';
                }
                break;
            case 39:
                if (snake_arr[0][0]<snake_arr[1][0])
                {
                    dir = 'left';
                }else{
                    dir = 'right';
                }

                break;
            case 40:
                if (snake_arr[0][1]<snake_arr[1][1])
                {
                    dir = 'up';
                }else
                {
                    dir = 'down';
                }

        }

    })

    //点击开始按钮则分别调动相应函数，游戏开始
   $('#game_start').click(function () {
        //此处进行初始化和贪吃蛇移动
        food();
        /*setInterval('food()',3000);*/
        snake();

        console.log(sped);
        timm = setInterval("move()",sped);



    })

    //食物初始化函数
    food = function () {
        /*alert('andy');*/
        var x = Math.random().toFixed(2) * 45;
        xx = Math.ceil(x) * 20;
        var y = Math.random().toFixed(2) * 30;
        yy = Math.ceil(y) * 20;

        //判断如果食物随机出现到蛇身上被覆盖时，则重新调用food()函数得到一个新位置
        for(var i=0;i<snake_arr.length;i++)
        {
            if(snake_arr[i][0]==xx && snake_arr[i][1]==yy)
            {
                food();
            }
        }
        $('#food_img').css({left:xx+'px',top:yy+'px'});
    }

    //蛇的初始化函数，因为蛇身蛇头都是用图片代替，所以蛇的出现和移动只需要改变其位置即可
    snake = function () {
        /*var snake_arr = [[5,2],[4,2]];*/
        var snake_left = 0;
        var snake_top = 0;

        for(var i=0;i<snake_arr.length;i++)
        {
            snake_left = snake_arr[i][0]*20 + 'px';
            snake_top = snake_arr[i][1]*20 +'px';
            //console.log('left:'+snake_left+',top:'+snake_top);
            $('.snake_all').eq(i).css({left:snake_left,top:snake_top});
        }

        /*timm = setInterval("move()",500);*/
    }

    //蛇的移动函数
    move = function () {

        var i=0;
        var len = snake_arr.length;
        var snake_left = 0;
        var snake_top = 0;

        //蛇身迭代移动
        for(i=(len-1);i>0;i--)
        {
            snake_arr[i][0] = snake_arr[i-1][0];
            snake_arr[i][1] = snake_arr[i-1][1];
        }
        //判断蛇头移动位置
        switch (dir)
        {
            case 'up':
                snake_arr[0][1]--;
                break;
            case 'down':
                snake_arr[0][1]++;
                break;
            case 'left':
                snake_arr[0][0]--;
                break;
            case 'right':
                snake_arr[0][0]++;
        }

        //蛇吃到食物
        if (snake_arr[0][0]*20 == xx && snake_arr[0][1]*20 == yy)
        {
            snake_score++;
            $('#snake_sco').text(snake_score);
            food();

            snake_arr.push([snake_arr[len-1][0],snake_arr[len-1][1]]);
            $('.snake_all').eq(1).clone().appendTo('#content_bg_div');
        }

        //撞墙死
        if (snake_arr[0][0]*20<0 || snake_arr[0][0]*20>900 ||
            snake_arr[0][1]*20<0 || snake_arr[0][1]*20>600)
        {

            clearInterval(timm);
            alert('So sorry, you are die!');

            return window.location.reload();
        }

        //撞自己死，因为上方判定了蛇不能直接后退，所以此处不会碰到身体的第一个单位，此处从下边2开始，其实从3开始也行
        //毕竟蛇要想撞到自己最多撞到自己身体第3块
        for(i=2;i<len;i++)
        {
            if(snake_arr[i][0] == snake_arr[0][0] &&
                snake_arr[i][1] == snake_arr[0][1])
            {
                alert('So sorry, you are die!');
                clearInterval(timm);
                return window.location.reload();
            }
        }

        //改变每个图片的位置
        for(i=0;i<len;i++)
        {
            snake_left = snake_arr[i][0]*20+'px';
            snake_top = snake_arr[i][1]*20+'px';
            /*$('.snake_all').eq(i).css({left:snake_arr[i][0]}+'px',top:snake_arr[i][1]+'px'};*/
            $('.snake_all').eq(i).css({left:snake_left,top:snake_top});
        }
    }
})
