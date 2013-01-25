/*
 * Copyright (C) 2012 M.Nakamura
 *
 * This software is licensed under a Creative Commons
 * Attribution-NonCommercial-ShareAlike 2.1 Japan License.
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 		http://creativecommons.org/licenses/by-nc-sa/2.1/jp/legalcode
 */

var timer = null;
var	cordova = null;

$(function(){
	timer = new Timer();
	timer.init();
	cordova = new Cordova();
	cordova.init();

	$("input#btn_five_min").click(function(){	timer.addTime(300);});
	$("input#btn_one_min").click(function(){	timer.addTime(60);});
	$("input#btn_ten_sec").click(function(){	timer.addTime(10);});
	$("input#btn_start").click(function(){	timer.start();});
	$("input#btn_stop").click(function(){	timer.stop();});
	$("input#btn_reset").click(function(){	timer.reset();});
});

function Timer()
{
	this.init = function()
	{
		this.data = { lastTime : 0, timerID : null, doing : false };
		this.drawTime();
	};
	
	this.drawTime = function()
	{
		var m = String(Math.floor(this.data.lastTime / 60));
		var s = String(this.data.lastTime % 60 + 100);
		
		$("td#time_m").html(m);
		$("td#time_s").html(s.substr(1));
	}
	
	this.addTime = function(value)
	{
		this.data.lastTime += value;
		this.drawTime();
	}
	
	this.start = function()
	{
		if(!this.data.doing && this.data.lastTime > 0)
		{
			this.data.doing = true;
			this.data.timerID = setInterval('timer.tick();',1000);
			this.drawTime();
		}
	}
	
	this.stop = function()
	{
		this.data.doing = false;
		clearInterval(this.data.timerID);
		this.data.timerID = null;
		this.drawTime();
	}
	
	this.reset = function()
	{
		this.stop();
		this.data.lastTime = 0;
		this.drawTime();
	}
	
	this.tick = function()
	{
		this.data.lastTime--;
		this.drawTime();
		
		if(this.data.doing && this.data.lastTime <= 0)
		{
			this.stop();
			cordova.playBeep(3);
		}
	}
}

function Cordova()
{
    // Cordova の読み込み完了まで待機
    //
	this.init = function()
	{
    	document.addEventListener("deviceready", this.onDeviceReady, false);
    }

    // Cordova 準備完了
    //
    this.onDeviceReady = function() {
        // 処理なし
    }

    // 警告音を鳴らす
    //
    this.playBeep = function(value) {
        navigator.notification.beep(value);
    }

    // バイブレーションさせます
    //
    this.vibrate = function(value) {
        navigator.notification.vibrate(value);
    }
}
