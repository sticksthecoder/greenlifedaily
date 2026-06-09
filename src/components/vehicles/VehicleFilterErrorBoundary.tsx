'use client';

/**
 * Error boundary for VehicleFilter — falls back to a full page reload with
 * the selected category in the query string (Requirement 9.7).
 */

import React from 'react';
import type { VehicleFilterCategory } from '@/lib/vehicle-filter';
import { vehicleFilterToSearchParam } from '@/lib/vehicle-filter';

interface VehicleFilterErrorBoundaryProps {
  category: VehicleFilterCategory;
  children: React.ReactNode;
}

interface VehicleFilterErrorBoundaryState {
  hasError: boolean;
}

export default class VehicleFilterErrorBoundary extends React.Component<
  VehicleFilterErrorBoundaryProps,
  VehicleFilterErrorBoundaryState
> {
  state: VehicleFilterErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): VehicleFilterErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(): void {
    const param = vehicleFilterToSearchParam(this.props.category);
    const url = param ? `/vehicles?category=${param}` : '/vehicles';
    window.location.assign(url);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}
