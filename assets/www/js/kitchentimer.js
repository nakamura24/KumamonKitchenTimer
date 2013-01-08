﻿/*
 * Copyright (C) 2012 M.Nakamura
 *
 * This software is licensed under a Creative Commons
 * Attribution-NonCommercial-ShareAlike 2.1 Japan License.
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 		http://creativecommons.org/licenses/by-nc-sa/2.1/jp/legalcode
 */

    // Cordova の読み込み完了まで待機
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova 準備完了
    //
    function onDeviceReady() {
        // 処理なし
    }

    // 警告音を3回鳴らす
    //
    function playBeep() {
        navigator.notification.beep(3);
    }

    // 2秒間バイブレーションさせます
    //
    function vibrate() {
        navigator.notification.vibrate(2000);
    }

var timer = null;

function init()
{
	timer = new Timer();
	timer.init();
}

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
		
		document.getElementById('time_m').innerHTML  = m;
		document.getElementById('time_s').innerHTML  = s.substr(1);
	}
	
	this.addTime = function(val)
	{
		this.data.lastTime += val;
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
			playBeep();
		}
	}
}
