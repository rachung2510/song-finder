<?php

namespace OCA\SongFinder\Controller;

use OCA\SongFinder\AppInfo\Application;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use OCP\IUserSession;

class SongFinderController extends Controller {
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

    private function lockFile(string $path): string {
        return '/tmp/nextcloud-song-finder-' . md5($this->userId . ':' . $path) . '.lock';
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

        $lockFile = $this->lockFile($path);
        if (file_exists($lockFile)) {
            return new JSONResponse(['running' => true]);
        }

        $lastSlash = strrpos($path, '/');
        if ($lastSlash === false) {
            return new JSONResponse(['error' => 'Invalid path'], 400);
        }

        $folder = substr($path, 0, $lastSlash);
        $prefix = substr($path, $lastSlash + 1);
        $logFile = '/tmp/nextcloud-song-finder-' . md5($this->userId . ':' . $path) . '.log';

        $cmd = sprintf(
            '%s %s --folder %s %s --lock %s > %s 2>&1 &',
            escapeshellarg('/var/www/html/nextcloud_sacm/apps/song_finder/python/.venv/bin/python'),
            escapeshellarg('/var/www/html/nextcloud_sacm/apps/song_finder/python/main.py'),
            escapeshellarg('sacm.av/files' . $folder),
            escapeshellarg($prefix),
            escapeshellarg($lockFile),
            escapeshellarg($logFile)
        );
        touch($lockFile);
        shell_exec($cmd);

        return new JSONResponse(['running' => true]);
    }

    /**
     * @NoAdminRequired
     */
    public function status(): JSONResponse {
        $path = $this->request->getParam('path');

        if (!$path) {
            return new JSONResponse(['error' => 'Missing path'], 400);
        }

        return new JSONResponse([
            'running' => file_exists($this->lockFile($path)),
        ]);
    }
}
