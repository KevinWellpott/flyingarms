import { NextResponse } from 'next/server';
import { syncYouTubeData } from '@/lib/cache';

/**
 * POST /api/youtube/sync
 * Führt eine manuelle Synchronisation der YouTube-Playlists und -Videos
 * mit der Datenbank aus (wie das Sync-Skript). Für Aufruf aus dem Admin-Dashboard.
 */
export async function POST() {
  try {
    const result = await syncYouTubeData();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      playlistsCount: result.playlistsCount,
      totalVideosCount: result.totalVideosCount,
      message: `Synchronisation abgeschlossen: ${result.playlistsCount ?? 0} Playlists, ${result.totalVideosCount ?? 0} Videos.`,
    });
  } catch (error) {
    console.error('YouTube sync API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unbekannter Fehler',
      },
      { status: 500 }
    );
  }
}
