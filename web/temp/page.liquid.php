<div class="product-grid">
    {% for product in collections['all'].products %}
    <div class="product-card">
        <a href="{{ product.url }}" class="product-card__link">
            <img src="{{ product.featured_image | img_url: '300x300' }}" alt="{{ product.title }}" class="product-card__image"/>
            <div class="product-card__info">
                <h2 class="product-card__title">{{ product.title }}</h2>
                <span class="product-card__price">{{ product.price | money }}</span>
            </div>
        </a>
    </div>
    {% endfor %}
</div>
<?php
