import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Props {
    onScanSuccess: (value: string) => void;
    onScanError?: (error: string) => void;
}

export default function QRScanner({ onScanSuccess, onScanError }: Props) {
    const [isScanning, setIsScanning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const scannerElementId = 'qr-scanner';

    const startScanning = () => {
        if (scannerRef.current) {
            return;
        }

        setError(null);
        setIsScanning(true);

        const scanner = new Html5QrcodeScanner(
            scannerElementId,
            {
                qrbox: { width: 250, height: 250 },
                fps: 10,
                aspectRatio: 1.0,
            },
            false
        );

        scannerRef.current = scanner;

        scanner.render(
            async (decodedText) => {
                scanner.clear();
                scannerRef.current = null;
                setIsScanning(false);

                try {
                    onScanSuccess(decodedText);
                } catch (err) {
                    const errorMsg =
                        err instanceof Error
                            ? err.message
                            : 'Failed to open scanner';
                    setError(errorMsg);
                    onScanError?.(errorMsg);
                }
            },
            (errorMessage) => {
                // Ignore
            }
        );
    };

    const stopScanning = () => {
        if (scannerRef.current) {
            scannerRef.current.clear();
            scannerRef.current = null;
        }
        setIsScanning(false);
        setError(null);
    };

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, []);

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Scan QR Code</h2>
                    {!isScanning && (
                        <Button onClick={startScanning} variant="default">
                            Start Camera
                        </Button>
                    )}
                    {isScanning && (
                        <Button onClick={stopScanning} variant="destructive">
                            Stop Camera
                        </Button>
                    )}
                </div>

                {error && (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20">
                        {error}
                    </div>
                )}

                <div id={scannerElementId} className="w-full" />

                {!isScanning && (
                    <p className="text-sm text-muted-foreground text-center">
                        Click "Start Camera" to begin scanning QR codes
                    </p>
                )}
            </div>
        </Card>
    );
}
