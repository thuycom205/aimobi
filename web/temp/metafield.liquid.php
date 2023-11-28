{% assign image_block = page.metafields.my_builder.image_block %}
<div class="image-block" style="text-align: {{ image_block.settings.alignment }}">
    <img src="{{ image_block.settings.image_url }}" alt="">
    <p>{{ image_block.settings.caption }}</p>
</div>
