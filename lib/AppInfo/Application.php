<?php

namespace OCA\SongFinder\AppInfo;

use OCP\AppFramework\App;
use OCP\EventDispatcher\IEventDispatcher;
use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCA\SongFinder\Listener\LoadFilesScriptsListener;

class Application extends App {
	public const APP_ID = 'song_finder';

	public function __construct() {
		parent::__construct(self::APP_ID);
		$container = $this->getContainer();

		$container->get(IEventDispatcher::class)->addServiceListener(
			LoadAdditionalScriptsEvent::class,
			LoadFilesScriptsListener::class
		);
	}
}
