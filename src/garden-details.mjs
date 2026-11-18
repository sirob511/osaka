import { photo } from './components.mjs';

export function gardenDetails() {
  return `<section class="garden-details wrap section-space" aria-labelledby="garden-details-title">
    <h2 id="garden-details-title">Inside <em>Osaka Garden.</em></h2>
    <div class="garden-details-layout">
      <div class="garden-details-image">
        ${photo('garden-bridge', 'Osaka Garden: an arched wooden bridge at left, a reflective pond in the foreground, and a low spreading tree with stones along the far bank.', { sizes: '(max-width: 650px) calc(100vw - 44px), (max-width: 900px) calc(100vw - 80px), 960px' })}
        <span class="garden-detail-marker garden-detail-marker-bridge" aria-hidden="true">1</span>
        <span class="garden-detail-marker garden-detail-marker-pond" aria-hidden="true">2</span>
        <span class="garden-detail-marker garden-detail-marker-shore" aria-hidden="true">3</span>
      </div>
      <ol class="garden-details-key">
        <li><span class="garden-detail-number" aria-hidden="true">1</span><div><h3>The arched bridge</h3><p>The wooden bridge curves over the narrow end of the pond.</p></div></li>
        <li><span class="garden-detail-number" aria-hidden="true">2</span><div><h3>The pond</h3><p>Reflections bring the bridge and surrounding greenery into the water.</p></div></li>
        <li><span class="garden-detail-number" aria-hidden="true">3</span><div><h3>Stones & trees</h3><p>Shoreline rocks and a low, spreading tree frame the pond’s edge.</p></div></li>
      </ol>
    </div>
  </section>`;
}
