<?php

namespace OCA\SongFinder\Controller;

use OCA\SongFinder\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IUserSession;

class SongFinderController extends Controller {

	public const LOCK_FILE = '/tmp/nextcloud-song-finder.lock';
	public const LOG_FILE = '/tmp/nextcloud-song-finder.log';

    private string $userId;

    public function __construct(
        string $appName,
        IRequest $request,
        IUserSession $userSession
    ) {
        parent::__construct($appName, $request);

        $user = $userSession->getUser();
        $this->userId = $user ? $user->getUID() : 'unknown';
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function start(): JSONResponse {
        $path = trim($this->request->getParam('path'));
        if (!$path) {
            return new JSONResponse(['error' => 'Missing path'], 400);
        }

        if (file_exists(self::LOCK_FILE)) {
            return new JSONResponse(['running' => true]);
        }

        $lastSlash = strrpos($path, '/');
        if ($lastSlash === false) {
            return new JSONResponse(['error' => 'Invalid path'], 400);
        }

        $folder = substr($path, 0, $lastSlash);
        $prefix = substr($path, $lastSlash + 1);

        $cmd = sprintf(
            '%s %s --folder %s %s --lock %s > %s 2>&1 &',
            escapeshellarg('/var/www/html/nextcloud_sacm/apps/song_finder/python/.venv/bin/python'),
            escapeshellarg('/var/www/html/nextcloud_sacm/apps/song_finder/python/main.py'),
            escapeshellarg('sacm.av/files' . $folder),
            escapeshellarg($prefix),
            escapeshellarg(self::LOCK_FILE),
            escapeshellarg(self::LOG_FILE)
        );
        touch(self::LOCK_FILE);
        shell_exec($cmd);

        return new JSONResponse(['running' => true]);
    }

    /**
     * @NoAdminRequired
     */
    public function status(): JSONResponse {
        // Only one job runs at a time, guarded by a single global lock file,
        // so the running state is not path-specific.
        return new JSONResponse([
            'running' => file_exists(self::LOCK_FILE),
        ]);
    }
}
