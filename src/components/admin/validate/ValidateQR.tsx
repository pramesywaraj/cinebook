import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

import { validateBooking } from '@/lib/api/booking';
import type { QRCodeData, ValidationResponse } from '@/lib/schemas/booking';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BOOKING_TYPE_MAP } from '@/lib/constants/booking';

import QRScanner from './QRScanner';

export default function ValidateQR() {
    const [validationResult, setValidationResult] =
        useState<ValidationResponse | null>(null);
    const [isValidating, setIsValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleScanSuccess = async (value: string) => {
        try {
            const qrData: QRCodeData = JSON.parse(value);

            if (!qrData.bookingCode) {
                throw new Error('Invalid QR code: missing bookingCode');
            }

            setError(null);

            await handleValidate(qrData.bookingCode);
        } catch (err) {
            const errorMsg =
                err instanceof Error
                    ? err.message
                    : 'Failed to parse QR code. Please scan a valid ticket.';
            setError(errorMsg);
            setValidationResult(null);
        }
    };

    const handleValidate = async (bookingCode: string) => {
        setIsValidating(true);
        setError(null);

        try {
            const result = await validateBooking(bookingCode);
            setValidationResult(result);
        } catch (err) {
            const errorMsg =
                err instanceof Error
                    ? err.message
                    : 'Failed to validate booking. Please try again.';
            setError(errorMsg);
            setValidationResult(null);
        } finally {
            setIsValidating(false);
        }
    };

    const handleReset = () => {
        setValidationResult(null);
        setError(null);
        setIsValidating(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2">Validate Tickets</h1>
                <p className="text-muted-foreground">
                    Scan QR codes from customer tickets to validate them
                </p>
            </div>

            {!validationResult && (
                <QRScanner
                    onScanSuccess={handleScanSuccess}
                    onScanError={(error) => {
                        setError(error);
                    }}
                />
            )}

            {error && (
                <Card className="p-6">
                    <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-destructive" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-destructive">
                                Error
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {error}
                            </p>
                        </div>
                        <Button
                            onClick={handleReset}
                            variant="outline"
                            size="sm"
                        >
                            Try Again
                        </Button>
                    </div>
                </Card>
            )}

            {isValidating && (
                <Card className="p-6">
                    <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <p className="text-muted-foreground">
                            Validating ticket...
                        </p>
                    </div>
                </Card>
            )}

            {validationResult && (
                <Card className="p-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                Validation Result
                            </h3>
                            {validationResult.valid ? (
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    <Badge
                                        variant="default"
                                        className="bg-green-500"
                                    >
                                        Valid
                                    </Badge>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <XCircle className="w-6 h-6 text-destructive" />
                                    <Badge variant="destructive">Invalid</Badge>
                                </div>
                            )}
                        </div>

                        {validationResult.valid && (
                            <>
                                <div className="space-y-2 pt-4 border-t">
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Booking Code:
                                        </span>
                                        <p className="font-mono text-sm">
                                            {
                                                validationResult.booking
                                                    .bookingCode
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Customer Name:
                                        </span>
                                        <p className="font-medium">
                                            {
                                                validationResult.booking
                                                    .customerName
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Booking Type:
                                        </span>
                                        <p>
                                            <Badge variant="outline">
                                                {
                                                    BOOKING_TYPE_MAP[
                                                        validationResult.booking
                                                            .bookingType
                                                    ]
                                                }
                                            </Badge>
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Studio ID:
                                        </span>
                                        <p>
                                            {validationResult.booking.studioId}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground">
                                            Seat IDs:
                                        </span>
                                        <p>
                                            {validationResult.booking.seatIds.join(
                                                ', '
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleReset}
                                    className="w-full mt-4"
                                    variant="default"
                                >
                                    Scan Another Ticket
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            )}
        </div>
    );
}
