/*
 * Copyright (C) 2012 M.Nakamura
 *
 * This software is licensed under a Creative Commons
 * Attribution-NonCommercial-ShareAlike 2.1 Japan License.
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 		http://creativecommons.org/licenses/by-nc-sa/2.1/jp/legalcode
 */

var	timer = null;
var	cordova = null;

$(function(){
	timer = new Timer();
	// タイマ 初期化
	timer.init();

	cordova = new Cordova();
	// Cordova 初期化
	cordova.init();

	// Buttonにクリック時の処理をバインド
	$("input#btn_five_min").click(function(){	timer.addTime(300);});
	$("input#btn_one_min").click(function(){	timer.addTime(60);});
	$("input#btn_ten_sec").click(function(){	timer.addTime(10);});
	$("input#btn_start").click(function(){	timer.start();});
	$("input#btn_stop").click(function(){	timer.stop();});
	$("input#btn_reset").click(function(){	timer.reset();});
});

function Timer() {
	// タイマ 初期化
	this.init = function() {
		this.data = { lastTime : 0, timerID : null, doing : false };
		this.drawTime();
	};
	
	// 時間を表示
	this.drawTime = function() {
		var m = String(Math.floor(this.data.lastTime / 60));
		var s = String(this.data.lastTime % 60 + 100);
		
		$("td#time_m").html(m);
		$("td#time_s").html(s.substr(1));
	}
	
	// タイマカウンタに追加
	this.addTime = function(value) {
		this.data.lastTime += value;
		this.drawTime();
	}
	
	// タイマ開始
	this.start = function() {
		if(!this.data.doing && this.data.lastTime > 0) {
			this.data.doing = true;
			this.data.timerID = setInterval('timer.tick();', 1000);
			this.drawTime();
		}
	}
	
	// タイマ停止
	this.stop = function() {
		this.data.doing = false;
		clearInterval(this.data.timerID);
		this.data.timerID = null;
		this.drawTime();
	}
	
	// タイマリセット
	this.reset = function() {
		this.stop();
		this.data.lastTime = 0;
		this.drawTime();
	}
	
	// タイマカウントダウン
	this.tick = function() {
		this.data.lastTime--;
		this.drawTime();
		
		// カウントが０
		if(this.data.doing && this.data.lastTime <= 0) {
			// タイマ停止
			this.stop();
			// 警告音を３回鳴らす
			cordova.playBeep(3);
		}
	}
}

function Cordova() {
	// Cordova 初期化
	this.init = function() {
		// Cordova の読み込み完了まで待機
		document.addEventListener("deviceready", this.onDeviceReady, false);
	}

	// Cordova 準備完了
	this.onDeviceReady = function() {
		// 処理なし
	}

	// 警告音を鳴らす
	this.playBeep = function(value) {
		// 警告音を鳴らす
		navigator.notification.beep(value);
	}

	// バイブレーションさせます
	this.vibrate = function(value) {
		// バイブレーションさせます
		navigator.notification.vibrate(value);
	}
}
