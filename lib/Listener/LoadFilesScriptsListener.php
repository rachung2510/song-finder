<?php

namespace OCA\SongFinder\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\Util;

class LoadFilesScriptsListener implements IEventListener {
    public function handle(Event $event): void {
        if (!$event instanceof LoadAdditionalScriptsEvent) {
            return;
        }
        error_log('SongFinder: loading Files script');
        Util::addInitScript('song_finder', 'song_finder-main');
    }
}

